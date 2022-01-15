/* global chrome */
import React from "react";
import { deepCopy, getUniqueId } from '../Utils/utils';
import { Modal } from './modal';

const Types = { group: '1', unique: '2' };
Object.freeze(Types);

function UniqueTypeForm(props) {
    const unique_name_id = getUniqueId('name');
    const unique_url_id = getUniqueId('url');
    return (
        <fieldset /* Unique */ >
            <label htmlFor={unique_name_id}>Name</label><input id={unique_name_id} type='text' data-dict-key='name' value={props.data.name || ''} onChange={props.onChange} />
            <label htmlFor={unique_url_id}>URL</label><input id={unique_url_id} type='text' data-dict-key='url' value={props.data.url || ''} onChange={props.onChange} />
        </fieldset>);
}

function GroupTypeForm(props) {
    const group_name_id = getUniqueId('name');
    return (
        <fieldset /* Group */>
            <label htmlFor={group_name_id}>Name</label><input id={group_name_id} type='text' data-dict-key='name' value={props.data.name || ''} onChange={props.onChange} />
        </fieldset>);
}


class PageManagerModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit();
    }
    handleCancel(event) {
        event.preventDefault();
        this.props.onCancel();
    }
    handleChange(event) {
        let newData = deepCopy(this.props.data);
        const dictKey = event.target.dataset.dictKey;
        const val = event.target.value;
        if (dictKey === 'type') {
            switch (val) {
                case Types.unique:
                    newData = { type: Types.unique, name: null, url: null };
                    break;
                case Types.group:
                    newData = { type: Types.group, name: null, isRoot: false, childs: [] };
                    break;
                default:
                    console.error('UnexpectedResult: type is not known.');
                    break;
            }
        }
        else if (!(['type', 'isRoot'].includes(dictKey)) && (Object.keys(newData).includes(dictKey))) {
            newData[dictKey] = val;
        }
        else {
            console.error('UnexpectedResult: dictKey is not known.');
        }
        this.props.onChange(newData);
    }
    render() {
        if (!Object.values(Types).includes(this.props.data.type) && this.props.data.type !== undefined) {
            console.error('UnexpectedResult: this.props.data.type is not known.')
        }
        const type_unique_id = getUniqueId('type-unique');
        const type_group_id = getUniqueId('type-group');
        return (
            <Modal>
                <form onSubmit={this.handleSubmit} onReset={this.handleCancel}>
                    <h2>Create new entry</h2>
                    <fieldset /* All */>
                        <input id={type_unique_id} name='type' type='radio' data-dict-key='type' value={Types.unique} onChange={this.handleChange} checked={this.props.data.type === Types.unique} /> <label htmlFor={type_unique_id}>Unique</label>
                        <input id={type_group_id} name='type' type='radio' data-dict-key='type' value={Types.group} onChange={this.handleChange} checked={this.props.data.type === Types.group} /> <label htmlFor={type_group_id}>Group</label>
                    </fieldset>
                    {this.props.data.type === Types.unique && <UniqueTypeForm onChange={this.handleChange} data={this.props.data} />}
                    {this.props.data.type === Types.group && <GroupTypeForm onChange={this.handleChange} data={this.props.data} />}
                    <input type='submit' value='Ok' />
                    <input type='reset' value='Cancel' />
                </form>
            </Modal>);
    }
}

class PageGroupView extends React.Component {
    constructor(props) {
        super(props); // root,  addNode (path), editNode (path), deleteNode (path), 
        this.state = { currentNode: props.root, path: [props.root.name] };
        this.handleChildClick = this.handleChildClick.bind(this);
        this.handleGoBackButtonClick = this.handleGoBackButtonClick.bind(this);
        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
        this.handleChildDeleteButtonClick = this.handleChildDeleteButtonClick.bind(this);
        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
        this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    }
    static getNodeFromDirection(root, direction) {
        for (let rulename of direction.slice(1)) {
            root = root.childs[root.childs.map((e) => { return e.name; }).indexOf(rulename)];
        }
        return root;
    }
    static deleteNodeFromDirection(root, direction) {
        root = PageGroupView.getNodeFromDirection(root, direction.slice(0, direction.length - 1));
        const names = root.childs.map((e) => { return e.name; });
        const name = direction[direction.length - 1];
        let index = names.indexOf(name);
        root.childs.splice(index, 1);
    }
    static setNodeFromDirection(root, direction, newValue) {
        root = PageGroupView.getNodeFromDirection(root, direction.slice(0, direction.length - 1));
        const names = root.childs.map((e) => { return e.name; });
        const name = direction[direction.length - 1];
        let index = names.indexOf(name);
        if (index == -1)
            root.childs.push(newValue)
        else
            root.childs[index] = newValue;
    }
    handleChildClick(event) {
        let childName = event.target.textContent;
        this.setState((prevState) => {
            const newPath = prevState.path.concat([childName]);
            return {
                path: newPath,
                currentNode: PageGroupView.getNodeFromDirection(this.props.root, newPath)
            };
        });
    }
    handleGoBackButtonClick() {
        this.setState((prevState) => {
            const newPath = prevState.path.slice(0, prevState.path.length - 1);
            return {
                path: newPath,
                currentNode: PageGroupView.getNodeFromDirection(this.props.root, newPath)
            }
        });
    }
    handleDeleteButtonClick() {
        this.props.deleteNode(this.state.path, () => {
            this.setState((prevState) => {
                const newPath = prevState.path.slice(0, prevState.path.length - 1);
                return {
                    path: newPath,
                    currentNode: PageGroupView.getNodeFromDirection(this.props.root, newPath)
                };
            });
        });
    }
    handleChildDeleteButtonClick(event) {
        let childName = event.target.value;
        this.props.deleteNode(this.state.path.concat([childName]), () => { });
    }
    componentDidUpdate(prevProps) {
        if (prevProps.root !== this.props.root) {
            this.setState({
                path: this.state.path,
                currentNode: PageGroupView.getNodeFromDirection(this.props.root, this.state.path)
            });
        }
    }
    handleEditButtonClick(event) {
        const path = event.target.value ? this.state.path.concat([event.target.value]) : this.state.path;
        this.props.editNode(path);
    }
    handleAddButtonClick() {
        const path = this.state.path;
        this.props.addNode(path);
    }
    render() {
        return (
            <div>
                {!this.state.currentNode.isRoot && <button onClick={this.handleGoBackButtonClick}>Go back</button>}
                <button onClick={this.handleAddButtonClick}>Add</button>
                {/*!this.state.currentNode.isRoot && <button onClick={this.handleEditButtonClick}>Edit</button>*/}
                {!this.state.currentNode.isRoot && <button onClick={this.handleDeleteButtonClick}>Delete</button>}
                <span>{this.state.path.join('/')}</span>
                <ul>
                    {this.state.currentNode.childs.map((child) => {
                        switch (child.type) {
                            case Types.group:
                                return (
                                    <div>
                                        <a value={child.name} onClick={this.handleChildClick}>{child.name}</a>
                                        <button value={child.name} onClick={this.handleEditButtonClick}>Edit</button>
                                        <button value={child.name} onClick={this.handleChildDeleteButtonClick}>Delete</button>
                                    </div>
                                );
                            case Types.unique:
                                return (
                                    <div>
                                        <a>{child.name}</a>
                                        <span>{child.url}</span>
                                        <button value={child.name} onClick={this.handleEditButtonClick}>Edit</button>
                                        <button value={child.name} onClick={this.handleChildDeleteButtonClick}>Delete</button>
                                    </div>
                                );
                            default:
                                console.error("Something went wrong!");
                                return null;
                        }
                    }).map((element, index) => { return <li key={index}>{element}</li> })}
                </ul>
            </div >
        );
    }
}

class PageManager2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            root: {
                type: Types.group, name: "All pages", isRoot: true, childs: [
                    { type: Types.unique, name: "Lichess", url: "lichess.org" },
                    { type: Types.group, name: "Hi!", isRoot: false, childs: [] }
                ]
            },
            modal: null
        };
        /*chrome.storage.local.get('blockedPages', (result) => {
            this.setState({ root: result.blockedPages });
            console.info('Data loaded!');
        });*/
        this.addPage = this.addPage.bind(this);
        this.editPage = this.editPage.bind(this);
        this.deletePage = this.deletePage.bind(this);
        this.handleModalSubmit = this.handleModalSubmit.bind(this);
        this.handleModalCancel = this.handleModalCancel.bind(this);
        this.handleModalChange = this.handleModalChange.bind(this);
    }
    addPage(path) {
        this.setState((prevState) => {
            return {
                root: prevState.root,
                modal: {
                    mode: "add",
                    targetAdress: path,
                    data: {}
                }
            };
        });
    }
    deletePage(path, callback) {
        this.setState((prevState) => {
            let newRoot = deepCopy(prevState.root);
            PageGroupView.deleteNodeFromDirection(newRoot, path);
            callback();
            return {
                root: newRoot,
                modal: prevState.modal
            };
        });
    }
    editPage(path) {
        this.setState((prevState) => {
            return {
                root: prevState.root,
                modal: {
                    mode: "edit",
                    targetAdress: path,
                    data: PageGroupView.getNodeFromDirection(prevState.root, path)
                }
            };
        });
    }
    handleModalSubmit() {
        this.setState((prevState) => {
            let newRoot = deepCopy(prevState.root);
            const mode = prevState.modal.mode;
            const data = prevState.modal.data;
            let target = "";
            switch (mode) {
                case "add":
                    target = prevState.modal.targetAdress.concat([data.name]);
                    break;
                case "edit":
                    target = prevState.modal.targetAdress;
                    break;
                default:
                    break;
            }
            PageGroupView.setNodeFromDirection(newRoot, target, data);
            return {
                root: newRoot,
                modal: null
            };
        });
    }
    handleModalCancel() {
        this.setState((prevState) => {
            return {
                root: prevState.root,
                modal: null
            };
        });
    }
    handleModalChange(newData) {
        this.setState((prevState) => {
            return {
                root: prevState.root,
                modal: {
                    targetAdress: prevState.modal.targetAdress,
                    mode: prevState.modal.mode,
                    data: newData
                }
            };
        });
    }
    render() {
        return (
            <div>
                {this.state.modal && <PageManagerModal
                    onSubmit={this.handleModalSubmit} onCancel={this.handleModalCancel}
                    onChange={this.handleModalChange} data={this.state.modal.data} />}
                <PageGroupView root={this.state.root} addNode={this.addPage}
                    editNode={this.editPage} deleteNode={this.deletePage} />
            </div>
        );
    }
}

export { PageManager2 };