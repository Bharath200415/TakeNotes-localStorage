import {Plus} from "lucide-react"
import {Button} from "./ui/button"
import PropTypes from "prop-types"
import { NotePropType } from "../lib/type"
import propTypes from "prop-types"

Header.propTypes = {
    onNewNote:propTypes.func.isRequired,
}

export default function Header({onNewNote}){
    return (
        <header className="border-b p-4 bg-card">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Browse Notes</h1>
                <Button onClick = {onNewNote} size="sm" className="cursor-pointer">
                    <Plus className="h-4 w-4 mr-2"/>
                    New Note
                </Button>

            </div>
        </header>
    )
}

Header.PropTypes = {
    onButtonClick:()=>propTypes.void

}