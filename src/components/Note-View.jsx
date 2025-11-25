import {Card,CardContent,CardHeader,CardTitle,CardFooter} from "./ui/card"
import { NotePropType } from "../lib/type";
import { formatDate } from "../lib/storage";
import propTypes from "prop-types";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area"
export default function NoteView({note,onEdit}){
    return (<Card>
        <CardHeader>
            <CardTitle>{note.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
                {formatDate(note.createdAt)}
            </p>
        </CardHeader>
        <CardContent>
            <ScrollArea className="h-[calc(100vh-350px)]">
                <div>{note.content}</div>
            </ScrollArea>
            
        </CardContent>
        <CardFooter className="flex justify-end" >
            <Button onClick={onEdit}>Edit Note</Button>
        </CardFooter>
        </Card>)
}

NoteView.propTypes = {
  note: NotePropType,
  onEdit:propTypes.func.isRequired,
};


