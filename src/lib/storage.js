const STORAGE_KEY="notes"

export function loadNotes(){
    if (typeof window==="undefined") return []

    const savedNotes = localStorage.getItem(STORAGE_KEY)
    if (savedNotes){
        try{
            return JSON.parse(savedNotes)
        }catch(error){
            console.log("failed to parse notes from the storage",error)
            return []
        }
    }
    return []
}
export function saveNotes(notes){
    if (typeof window==="undefined") return 
    localStorage.setItem(STORAGE_KEY,JSON.stringify(notes))
}

export function formatDate(timestamp){
    return new Date(timestamp).toLocaleDateString("en-US",{
        year:"numeric",
        month:"short",
        day:"numeric"
    })

}