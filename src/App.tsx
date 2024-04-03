import { AttendeeList } from "./components/attendee-lis";
import { Header } from "./components/header";


export function App() {

  return (
   <div className="max-w-[1216] mx-auto py-5 px-5 flex flex-col gap-5">
    <Header />
    <AttendeeList />
   </div>
  )
}

