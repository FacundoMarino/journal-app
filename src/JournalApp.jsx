import { AppRouter } from "./routes/AppRouter"
import { AppTheme } from "./theme/AppTheme"

export const JournalApp = () => {
  return (
    <>      
        <AppTheme>
          <AppRouter />
        </AppTheme>
    </>
  )
}

