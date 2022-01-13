import sys
import os
from distutils.dir_util import copy_tree


def build_background_scripts():
    copy_tree('src/background_scripts/', 'build/')


def build_metadata():
    copy_tree('src/metadata/', 'build/')


def build_settings_site():
    os.environ["INLINE_RUNTIME_CHUNK"] = "false"
    os.environ["GENERATE_SOURCEMAP"] = "false"
    os.system('cd src/settings_site && npm run build')
    copy_tree('src/settings_site/build/', 'build/')


build_bindings = {
    "background_scripts": build_background_scripts,
    "metadata": build_background_scripts,
    "settings_site": build_settings_site
}

build_modes = {
    "all": ["background_scripts", "metadata", "settings_site"],
    "background_scripts": ["background_scripts"],
    "metadata": ["metadata"],
    "settings_site": ["settings_site"]
}


def main():
    if len(sys.argv) < 2:
        print("Please pass the build mode as argument.")
        exit(1)
    selected_build_mode = sys.argv[1]
    if selected_build_mode not in build_modes:
        print("That is not a valid build mode.")
        exit(1)

    to_build_bindings = build_modes[selected_build_mode]
    for binding in to_build_bindings:
        print(f"Starting to build '{binding}'.")
        build_bindings[binding]()
        print(f"Finished building '{binding}'.")


if __name__ == '__main__':
    main()
