import { redirect } from "react-router-dom";
import { Session } from "./Session"

export const rootLoader = () => {
    const session = new Session();

    if(session.getSession() === ''){
        return redirect('/login')
    }else{
        return session;
    }
}