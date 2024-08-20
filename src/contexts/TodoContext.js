import { createContext,useContext } from "react";

export const TodoContext=createContext({
         todos:[
            {
                id:1,
                title:"Todo Msg",
                completed:false
            },
         ],
         addTodo : (title)=>{},
         deleteTodo : (id)=>{},
         updateTodo:(id,title)=>{},
         toggleTodo:(id)=> {}
})

export const useTodo=()=>{
    return useContext(TodoContext)
}

export const TodoProvider=TodoContext.Provider;
