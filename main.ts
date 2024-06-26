import { Editor, MarkdownView, Plugin } from "obsidian";

const ALL_HEADER: Record<string, string> = {
    "- # ": "# ",
    "- ## ": "## ",
    "- ### ": "### ",
    "- #### ": "#### ",
    "- ##### ": "##### ",
    "- ###### ": "###### ",
  };
  // all currently available headers in obsidian

export default class BuletpointedHeader extends Plugin {
/**
 * Called when the plugin is loaded.
 */
async onload() {
    this.addCommand({
        id: 'remove bullets', // unique identifier for the command   
        name: 'Remove bullets', // name of the command
        editorCallback: (editor: Editor, view: MarkdownView) => {
            const allLines = this.getAllLines(view); //get all lines in the active document
            for (let i = 0; i < allLines.length; i++) { //iterate through all lines
                const codeblock = allLines[i]; // Get the current line
                const trimmedCodeblock = codeblock.trimStart(); // Remove leading whitespace
                
                for (let [key, value] of Object.entries(ALL_HEADER)) {  //iterate through all headers
                    if (trimmedCodeblock.startsWith(key)) {     //if the current line starts with a header
                        let newCodeblock = codeblock.replace(key, value); //replace the header with the - with the one withou the -
                        editor.replaceRange(newCodeblock, { line: i, ch: 0 }, { line: i, ch: codeblock.length }); //replace the current line with the new line
                    }
                }
            }
            
        },
    });
}

/**
 * Retrieves all lines in the active document.
 * @param view - The active MarkdownView.
 * @returns An array of strings representing each line in the document.
 */
getAllLines(view: MarkdownView): string[] {
    const lines = view.editor.getValue().split('\n');
    return lines;
}
}