import { useState } from "react"
import { NotePropType } from "../lib/type"
import {Card, CardContent, CardFooter, CardHeader} from "./ui/card"
import {Input} from "./ui/input"
import {Textarea} from "./ui/textarea"
import propTypes from "prop-types"
import { X } from "lucide-react"
import { Button } from "./ui/button"
import { Save } from "lucide-react"

export default function NoteEditor({note,onCancel,onSave}){
    const [title,setTitle] = useState(note.title);
    const [content,setContent] = useState(note.content);

    const handleSave=()=>{
        onSave({
            ...note,
            title:title.trim() || "Untitled Note",
            content,
        })

    }

    return (
        <Card>
            <CardHeader>
                <Input 
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder = "Note-title"
                className="text-xl font-bold border-none px-0 focus-visible:ring-0">
                </Input>
            </CardHeader>
            <CardContent>
                <Textarea 
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                placeholder = "write your note here..."
                className="h-[calc(100vh-350px)] resize-none border-none focus-visible:ring-0 p-0"
                ></Textarea>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={onCancel}>
                    <X className="h-4 w-4 mr-2"/>
                    Cancel
                </Button>
                <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2"/>
                    Save
                </Button>
            </CardFooter>
        </Card>
    )

}
NoteEditor.propTypes = {
    note:NotePropType,
    onCancel:propTypes.func.isRequired,
    onSave:propTypes.func.isRequired,
}