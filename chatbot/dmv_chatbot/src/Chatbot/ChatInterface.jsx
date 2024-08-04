import React, { useState, useEffect ,useRef} from 'react';
import { Sun, Moon } from 'lucide-react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
// import { set } from 'mongoose';



const ChatInterface = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [chatHistory, setchatHistory] = useState([]);
  const [userChat, setUserChat] = useState([]);
  const[userquestion,setuserquestion]=useState('');
  const navigate=useNavigate();
  const inputRef = useRef(null);
  // const lastChatRef = useRef(null);

  useEffect(() => {
    loadUserChat();
    loadanswers();
    onChatChange(JSON.parse(localStorage.getItem('Chatuse')));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);


  const onChatChange=(chatbts)=>
  {
    try{
    //  setUserChat([]);
      setchatHistory([]);
      localStorage.setItem('Chatuse',JSON.stringify(chatbts));
      console.log('on change Chatuse:',chatbts);
     // const ChatID=chatbts.ChatID;
      loadanswers();
      // const response=await axios.
    }
    catch(err)
    {
      console.log("Error in Changing Chat");
    }
  };
  const loadUserChat = async () => {
    const userinfo=JSON.parse(localStorage.getItem('user'));
    const userID=userinfo.userId;
    try{
    const response=await axios.get(`https://domestic-violence-chatbot-1.onrender.com/api/chats/${userID}`);
    console.log('Chats:',response.data.chats);
    setUserChat(response.data.chats);

    if (response.data.chats.length>0)
    {
        localStorage.setItem('Chatuse',JSON.stringify(response.data.chats[0]));
        console.log('Chatuse:called');
    }
    }
    catch(err)
    {
      console.error('Error fetching my chats:', err);
    }
  };
  const loadanswers=async()=>
  {
    const chatuse=JSON.parse(localStorage.getItem('Chatuse'));
    const chatID=chatuse.chatID;
    console.log('ChatID:',chatID);
    try{
      const response=await axios.get(`https://domestic-violence-chatbot-1.onrender.com/api/loaddetails/${chatID}`);
      console.log('chatHostory:',response.data);
      setchatHistory(response.data);
    }
    catch(err)
    {
      console.error('Error fetching my chats:', err);
    }
  };
  const handleuserquestchange = (event)=>
  {
    setuserquestion(event.target.value);
     
  }
  const handleUserQuestion=async(event)=>
  {
    console.log("user question",userquestion);
    const question=userquestion;
    const chatID=JSON.parse(localStorage.getItem('Chatuse')).chatID;
    
    try
    {
      const response = await axios.get(`https://domestic-violence-chatbot-1.onrender.com/api/storequestgetans`,{
        params:{
          chatID:chatID,
          question:question,
          chatHistory:chatHistory
        }
      }
      );
      console.log('Response:',response.data);
      setchatHistory([]);
      setuserquestion('');
      event.target.value='';
      await loadanswers();
      // navigate(`/login`);
      // window.location.reload();
    }
    catch(err){
      console.log("user question not processed properly");
    }
  }

  const AddChat=async()=>
  {
    console.log('Add Chat');
    try
    {
      const response=await axios.post(`https://domestic-violence-chatbot-1.onrender.com/api/createchat`,{
        userID:JSON.parse(localStorage.getItem('user')).userId,
        title:'New Chat'
      });
      setUserChat([]);
      loadUserChat();
      onChatChange();
    }
    catch{
      console.log('Error in adding chat');
    }
  }


  const handleTitleChange=(chatID, title)=>
  {
    console.log("Title edited");
  };
  const TitleChange=(chatID, title)=>
  {
      try
      {
        const response=axios.post(`https://domestic-violence-chatbot-1.onrender.com/api/updateTitle`,{
          chatID:chatID,
          title:title
        });
        setUserChat([]);
        loadUserChat();
        // setUserChat(userChat=>{
        //   return userChat.map(chatbts=>
        //     chatbts.chatID===chatID?{...chatbts,title:title}:chatbts  
        //   )
        // })
      }
      catch(err)
      {
        console.log('Error in updating title');
      }
  };
  const handleKeyDown = (chatID,event) => {
    if (event.key === 'Enter') {
      const chatID = chatID/* get chatID from context or state */;
      const title = inputRef.current.value;
      TitleChange(chatID, title);
    }
  };
  return (
    <div className="flex h-screen antialiased text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900">
      <div className="flex flex-col md:flex-row h-full w-full overflow-x-hidden">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block md:flex md:flex-col py-8 pl-6 pr-2 w-full md:w-64 bg-white dark:bg-gray-800 flex-shrink-0 transition-all duration-300`}>
          <div className="flex flex-row items-center justify-between h-12 w-full">
            <button className="flex items-center justify-center rounded-2xl text-indigo-700 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900 h-10 w-10" onClick={AddChat}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
            </button>
            <div className="ml-2 font-bold text-2xl">ChatBot</div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          {/* User profile */}
          <div className="flex flex-col items-center bg-indigo-100 dark:bg-indigo-900 border border-gray-200 dark:border-gray-700 mt-4 w-full py-6 px-4 rounded-lg">
            <div className="h-20 w-20 rounded-full border overflow-hidden">
              <img src="/src/Chatbot/bot.png" alt="Avatar" className="h-full w-full" />
            </div>
            <div className="text-sm font-semibold mt-2">{JSON.parse(localStorage.getItem('user')).email}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Chatbot User</div>
            <div className="flex flex-row items-center mt-3">
              <div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
                <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
              </div>
              <div className="leading-none ml-1 text-xs">Active</div>
            </div>
          </div>
          {/* Chat history */}
          <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center justify-between text-xs">
              <span className="font-bold">Chat History</span>
              <span className="flex items-center justify-center bg-gray-300 dark:bg-gray-600 h-4 w-4 rounded-full">4</span>
            </div>
            {/*add chat buttons here*/}
          
            <div  className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto" >
            {userChat.map((chatbts)=>(
              <button key={chatbts.chatID} className="flex flex-row items-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl p-2" onClick={()=>onChatChange(chatbts) }>
                <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 dark:bg-indigo-700 rounded-full">1</div>
                <div className="ml-2 text-sm font-semibold" /*value={chatbts.title} placeholder="Edit Chat Title" onChange={(e) => handleTitleChange(chatbts.chatID, e.target.value)}  ref={inputRef} onKeyDown={() => handleKeyDown(chatbts.chatID)*/>{chatbts.title} </div>
                {/* <button className="flex items-center justify-center rounded-2xl text-indigo-700 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900 h-10 w-10">
              {/* <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg> */
             /* }...
            </button> */}
              </button>
              ))}
              {/* Add more chat history buttons here */}
            </div>

          </div>
        </div>

        {/* Main chat area */}
        <div className="flex flex-col flex-auto h-full p-6">
          {/* Mobile menu button */}
          <button 
            className="md:hidden mb-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? 'Close Menu' : 'Open Menu'}
          </button>

          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 dark:bg-gray-800 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
              {chatHistory.map((chat) => (
                <div key={chat._id}  className="grid grid-cols-12 gap-y-2"> {/*here is where the chatbot map function will be*/}
                  <div className="col-start-6 col-end-13 p-3 rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        U
                      </div>
                      <div className="relative mr-3 text-sm bg-indigo-100 dark:bg-indigo-900 py-2 px-4 shadow rounded-xl">
                        <div>{chat.question}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        B
                      </div>
                      <div className="relative ml-3 text-sm bg-white dark:bg-gray-700 py-2 px-4 shadow rounded-xl">
                        <div>{chat.answer}</div>
                      </div>
                    </div>
                  </div>
                  {/* Add more message components here */}
                </div>
                     ))}
              </div>
            </div>
            {/*this is where the input from the user is taken and stored in*/}
            <div className="flex flex-row items-center h-16 rounded-xl bg-white dark:bg-gray-700 w-full px-4">
              <div>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                  </svg>
                </button>
              </div>
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input 
                    type="text"
                    className="flex w-full border rounded-xl outline-none focus:border-indigo-300 pl-4 h-10 bg-transparent"
                    placeholder="Type your message..."
                    value={userquestion}
                    onChange={(qste) => setuserquestion(qste.target.value)}
                  />
                </div>
              </div>
              <div className="ml-4">
                <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0" onClick={(qste)=>handleUserQuestion(qste)}>
                  <span>Send</span>
                  <span className="ml-2">
                    <svg className="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;