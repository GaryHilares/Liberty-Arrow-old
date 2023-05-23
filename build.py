import sys
import os
from distutils.dir_util import copy_tree


def update_public():
    copy_tree('src/public/', 'build/public',update=True)

def build_all():
    os.environ["INLINE_RUNTIME_CHUNK"] = "false"
    os.environ["GENERATE_SOURCEMAP"] = "false"
    os.system('npm run build')


build_bindings = {
    "public": update_public,
    "all": build_all
}

def main():
    if len(sys.argv) < 2:
        print("Please pass the build mode as argument.")
        exit(1)
    selected_build_mode = sys.argv[1]
    if selected_build_mode not in build_bindings:
        print("That is not a valid build mode.")
        exit(1)
    
    print(f"Starting building...")
    build_bindings[selected_build_mode]()
    print(f"Finished building.")


if __name__ == '__main__':
    main()
