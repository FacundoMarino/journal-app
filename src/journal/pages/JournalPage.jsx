
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView } from "../views"
import { NothingSelectedView } from "../views/NothingSelectedView"

export const JournalPage = () => {
  return (

    <JournalLayout>
{//      <NothingSelectedView />
}  
  <NoteView />
  </JournalLayout>
  )
}