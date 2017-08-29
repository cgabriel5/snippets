#!/bin/bash

# original code: [https://gist.github.com/leventebalogh/ba862a284d21c39a80ed03af7be128b5]
# grunt auto-completion: [https://github.com/gruntjs/grunt-cli/blob/master/completion/bash]
# Inspired by the examples above. This version is simplified for speed.
#
# How It Works:
# Looks for the first gulpfile.js file. If a gulpfile.js is found the task names are extracted
# and used for auto-completion. This version allows for double and single quotes in gulp.task.
# For example, gulp.task("default", function() {}); and gulp.task('default', function() {});
# both work fine.
#
# How to use:
# 1: Add the following line to your .bashrc/.bash_profile file: source ~/.gulp-completion.sh
# 2: Create ~/.gulp-completion.sh and place the contents of this file in it.
# 3: Restart terminal.
# 4. Use auto-completion like you would anything else.
#
function _gulp_completions() {

    # Define vars.
    local cur="${COMP_WORDS[COMP_CWORD]}" # The currently typed in word to auto-complete.
    current_path=$(pwd) # cache the current working directory
    gulp_file="" # initiate gulp_file variable

    # Find the first gulpfile.js file path to use.
    while [ "${current_path}" != "/" ]; do
        # -maxdepth: only search current directory level
        # -iname:    case insensitive name
        # -type:     only files (skip directories)
        gulp_file=$(find "${current_path}" -maxdepth 1 -iname "gulpfile.js" -type f)

        # Break once a gulpfile.js is found.
        if [ ! -z "${gulp_file}" ]; then break; fi;

        # Reset the current path.
        current_path=$(dirname "${current_path}")
    done

    # If the gulp_file var is empty then it does not contain the gulpfile.js
    # file path. Therefore, the file does not exist so simply return.
    if [ -z "${gulp_file}" ]; then return; fi;

    # Get all gulp tasks in the files (allows for either single or double quotes)
    gulp_tasks=$(grep -rhio "gulp\.task([\"|'][^\"']*" ${gulp_file} | sed "s/gulp.task([\"|']//g")

    # Without this auto-completion would not work for colons.
    COMP_WORDBREAKS="${COMP_WORDBREAKS//:}"

    # Tell complete what stuff to show.
    COMPREPLY=($(compgen -W "$gulp_tasks" -- "$cur"))

}

# complete -o default -F _gulp_completions gulp
complete -o default -F _gulp_completions gulp
