import './style.css'

import { dialogue, MessageOptions, isNext, isOptions } from './dialogue'


let currentOptions: HTMLElement | null = null


const root = document.querySelector<HTMLDivElement>('#app')!


function navigateCallback({text, next}: {text: string, next: string}): () => void {
    /**
     * Create navigation callback for buttons.
     */

    return () => {
        addText(text);
        navigate(next);
    };
}


function removeOptions() {
    /**
     * Remove options button group if exists.
     */

    if (currentOptions !== null) {
        root.removeChild(currentOptions)
    }

    currentOptions = null
}


function addOptions(messageOptions: MessageOptions) {
    /**
     * Add options button group to dialogue.
     */

    removeOptions()

    const buttonGroup = document.createElement("div")
    buttonGroup.className = "dialogue-button-group"

    for (let option of messageOptions.options) {
        const button = document.createElement("button")
        button.textContent = option.text
        button.onclick = navigateCallback(option)

        buttonGroup.appendChild(button)
    }

    root.appendChild(buttonGroup);
    currentOptions = buttonGroup;
}


function addText(text: string) {
    /**
     * Add text directly to dialogue.
     */

    const pElement = document.createElement("p")
    pElement.textContent = text
    root.appendChild(pElement)
}


function navigate(label: string) {
    /**
     * Navigate to label in dialogue tree.
     */

    const dialogueLocation = dialogue[label]

    if (isNext(dialogueLocation)) {
        addText(dialogueLocation.text)
        navigate(dialogueLocation.next)
    } else if (isOptions(dialogueLocation)) {
        addText(dialogueLocation.text)
        addOptions(dialogueLocation)
    } else {
        removeOptions()
        addText(dialogueLocation.text)
    }
}


navigate("begin")  // Begin navigation