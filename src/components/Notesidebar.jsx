import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import EmptyState from "./EmptyState";
import propTypes from "prop-types";
import { NotePropType } from "../lib/type";
import {Button} from "./ui/button"
import { Trash2 } from "lucide-react";
import { formatDate } from "../lib/storage";
import { ScrollArea } from "./ui/scroll-area";

const Notesidebar = ({notes, onSelectNote, onButtonClick,onDeleteNote,activeNoteId}) => {
  return (
    <Card className="h-full bg-gray">
    <CardHeader>
        <CardTitle>My Notes</CardTitle>
    </CardHeader>
    <CardContent>
        {notes.length===0?(
            <EmptyState message="no notes yet" buttonText="Create your first Note" onButtonClick={onButtonClick}/>
        ):(
            <ScrollArea className="h-[calc(100vh-250px)]">
                <div>
                    {notes.map(note=>{
                        return(
                        <div onClick={()=>{
                            onSelectNote(note)
                        }}
                        key={note.id} 
                        className={`p-3 rounded-md cursor-pointer hover:bg-accent transition-colors ${
                            activeNoteId===note.id?"bg-accent":""}`}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium">
                                        {note.title.substring(0,30)}
                                        {note.title.length>30?"...":""}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {note.content.substring(0,40)}
                                        {note.content.length>40?"...":""}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDate(note.createdAt)}
                                    </p>

                                </div>
                                <div>
                                    <Button variant="ghost" 
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        onDeleteNote(note.id)}}
                                    size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive cursor-pointer"
                                    ><Trash2 className="h-4 w-4"/></Button>
                                </div>
                            </div>
                        </div>
                        )

                    })}
                </div>
            </ScrollArea>
        )}
    </CardContent>
    </Card>
  )
}

Notesidebar.propTypes = {
    notes:propTypes.arrayOf(NotePropType).isRequired,
    onSelectNote:propTypes.func.isRequired,
    onButtonClick:propTypes.func.isRequired,
    onDeleteNote:(id)=>propTypes.void,
    activeNoteId:String,
}
export default Notesidebar
