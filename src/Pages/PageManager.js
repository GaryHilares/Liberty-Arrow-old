/* global chrome */
import React from "react";
import deepCopy from '../utils';

const Types = {group: '1', unique: '2'};
Object.freeze(Types);

class Modal extends React.Component
{
  constructor(props)
  {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event)
  {
    event.preventDefault();
    this.props.onSubmit();
  }
  handleCancel(event)
  {
    event.preventDefault();
    this.props.onCancel();
  }
  handleChange(event)
  {
    let newData = deepCopy(this.props.data);
    const dictKey = event.target.dataset.dictKey;
    const val = event.target.value;
    if(dictKey === 'type')
    {
      if(val === Types.unique)
        newData = {type: Types.unique, name: null, url: null};
      else if(val === Types.group)
        newData = {type: Types.group, name: null, isRoot: false, childs: []};
      else
        console.error('UnexpectedResult: type is not known.');
    }
    else if (dictKey === 'name' || dictKey === 'url')
    {
      newData[dictKey] = val;
    }
    else
    {
      console.error('UnexpectedResult: dictKey is not known.');
    }
    this.props.onChange(newData);
  }
  getFieldset()
  {
    switch(this.props.data.type)
    {
      case Types.unique:
        return (<fieldset /* Unique */ >
                  <span>Name</span><input type='text' data-dict-key='name' value={this.props.data.name || ''} onChange={this.handleChange} />
                  <span>URL</span><input type='text' data-dict-key='url' value={this.props.data.url || ''} onChange={this.handleChange} />
                </fieldset>);
      case Types.group:
        return (<fieldset /* Group */>
                  <span>Name</span><input type='text' data-dict-key='name' value={this.props.data.name || ''} onChange={this.handleChange} />
                </fieldset>);
      default:
        return null;
    }
  }
  render()
  {
    return (
    <form onSubmit={this.handleSubmit} onReset={this.handleCancel}>
      <h2>Create new entry</h2>
      <fieldset /* All */>
        <input name='type' type='radio' data-dict-key='type' value={Types.unique} onChange={this.handleChange} checked={this.props.data.type === Types.unique} /> <span>Unique</span>
        <input name='type' type='radio' data-dict-key='type' value={Types.group} onChange={this.handleChange} checked={this.props.data.type === Types.group} /> <span>Group</span>
      </fieldset>
      {this.getFieldset()}
      <input type='submit' value='Ok' />
      <input type='reset' value='Cancel' />
    </form>);
  }
}

class PageUniqueManagerUnit extends React.Component
{
  constructor(props)
  {
    super(props);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
  }
  handleDeleteButtonClick()
  {
    this.props.onDeleteButtonClick(this.props.selectorArray);
  }
  render()
  {
    return (<div>
      <span>{this.props.name}</span><span>{this.props.url}</span>
      <button onClick={this.handleDeleteButtonClick}>Delete</button>
    </div>);
  }
}

class PageGroupManagerUnit extends React.Component
{
  constructor(props)
  {
    super(props);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
  }
  handleAddButtonClick()
  {
    this.props.onAddButtonClick(this.props.selectorArray);
  }
  handleDeleteButtonClick()
  {
    this.props.onDeleteButtonClick(this.props.selectorArray);
  }
  render()
  {
    return (
    <div>
      {this.props.isRoot ? null:<h1>{this.props.name}</h1>}
      <button onClick={this.handleAddButtonClick}>Add</button>
      {this.props.isRoot ? null:<button onClick={this.handleDeleteButtonClick}>Delete</button>}
      <button>Configure</button>
      <ul>
        {this.props.currentNode.childs.map((element,index)=>{
            if(element.type === Types.group)
              return <li key={index}><PageGroupManagerUnit
              currentNode={element}
              isRoot={false}
              name={element.name}
              childs={[]}
              selectorArray={this.props.selectorArray.concat(index)}
              onAddButtonClick={this.props.onAddButtonClick}
              onDeleteButtonClick={this.props.onDeleteButtonClick}
              /></li>;
            else if(element.type === Types.unique)
              return <li key={index}><PageUniqueManagerUnit
              currentNode={element}
              name={element.name}
              url={element.url}
              selectorArray={this.props.selectorArray.concat(index)}
              onDeleteButtonClick={this.props.onDeleteButtonClick}
              /></li>;
            else
              return null;
          }, this)
        }
      </ul>
    </div>);
  }
}

class PageManager extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {root: {type: Types.group, name: null, isRoot: true, childs: []}, modal: {showing: false, targetAdress: null, data: {}}}
    chrome.storage.local.get('blockedPages',(result)=>{
      this.setState({root: result.blockedPages, modal: {showing: false, targetAdress: null, data: {}}});
      console.log('Data loaded!');
    });
    this.addPage = this.addPage.bind(this);
    this.deletePage = this.deletePage.bind(this);
    this.save = this.save.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    this.handleModalCancel = this.handleModalCancel.bind(this);
    this.handleModalChange = this.handleModalChange.bind(this);
    this.openModalOnAddMode = this.openModalOnAddMode.bind(this);
  }
  handleModalSubmit()
  {
    this.addPage(this.state.modal.targetAdress,this.state.modal.data);
    this.setState({modal: {showing: false, targetAdress: null, data: {}}});
  }
  handleModalCancel()
  {
    this.setState({modal: {showing: false, targetAdress: null, data: {}}});
  }
  handleModalChange(modalData)
  {
    this.setState((state)=>{return {modal: {showing: state.modal.showing, targetAdress: state.modal.targetAdress, data: modalData}};});
  }
  openModalOnAddMode(selectorArray)
  {
    this.setState({modal: {showing: true, targetAdress: selectorArray, data: {}}});
  }
  addPage(selectorArray,newPageData)
  {
    let newRoot = deepCopy(this.state.root);
    let cur = newRoot.childs;
    for(let i = 0; i < selectorArray.length; i++)
      cur = cur[selectorArray[i]].childs;
    cur.push(newPageData);
    this.setState({root: newRoot});
  }
  deletePage(selectorArray)
  {
    let newRoot = deepCopy(this.state.root);
    let cur = newRoot.childs;
    for(let i = 0; i < selectorArray.length - 1; i++)
      cur = cur[selectorArray[i]].childs;
    cur.splice(selectorArray[selectorArray.length - 1],1);
    this.setState({root: newRoot});
  }
  
  save()
  {
    console.log("Root: ");
    console.log("Size in bytes: " + unescape(encodeURIComponent(JSON.stringify(this.state.root))).length);
    console.log(this.state.root);
    chrome.storage.local.set({blockedPages: this.state.root},()=>{
      console.log("Data saved!");
    });
    chrome.storage.local.get(null, (result)=>{console.log(result);})
  }
  render()
  {
    return (
    <div>
      {this.state.modal.showing ? <Modal onSubmit={this.handleModalSubmit} onCancel={this.handleModalCancel}
                                  onChange={this.handleModalChange} data={this.state.modal.data} /> : null}
      <button onClick={this.save}>Save</button>
      <PageGroupManagerUnit
      currentNode={this.state.root}
      isRoot={true}
      name={null}
      childs={[]}
      selectorArray={[]}
      onAddButtonClick={this.openModalOnAddMode}
      onDeleteButtonClick={this.deletePage} />
    </div>);
  }
}

export default PageManager;