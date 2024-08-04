import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, LogOut, Plus, Pencil, Check } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChatInterface = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [userChat, setUserChat] = useState([]);
  const [userQuestion, setUserQuestion] = useState('');
  const [chatCount, setChatCount] = useState(0);
  const [editingChatId, setEditingChatId] = useState(null);
  const [newChatTitle, setNewChatTitle] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('usechat') === 'true') {
      console.log("Button added at useeffect");
      localStorage.setItem('usechat', "false");
      AddChat();
      loaddmvpy();
    }
    loadUserChat();
    loadanswers();
    onChatChange(JSON.parse(localStorage.getItem('Chatuse')));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const loaddmvpy=async ()=>
  {
try{
  const response = await axios.get(`https://dmv-py.onrender.com`);
}
catch(err)
{
  console.log("dmv-py is not responsive");
}
  };
  
  const onChatChange = (chatbts) => {
    try {
      setChatHistory([]);
      localStorage.setItem('Chatuse', JSON.stringify(chatbts));
      console.log('on change Chatuse:', chatbts);
      loadanswers();
    } catch (err) {
      console.log("Error in Changing Chat");
    }
  };

  const loadUserChat = async () => {
    const userinfo = JSON.parse(localStorage.getItem('user'));
    const userID = userinfo.userId;
    try {
      const response = await axios.get(`https://domestic-violence-chatbot-1.onrender.com/api/chats/${userID}`);
      console.log('Chats:', response.data.chats);
      setUserChat(response.data.chats);
      setChatCount(response.data.chats.length);

      if (response.data.chats.length > 0) {
        localStorage.setItem('Chatuse', JSON.stringify(response.data.chats[0]));
        console.log('Chatuse:called');
      }
    } catch (err) {
      console.error('Error fetching my chats:', err);
    }
  };

  const loadanswers = async () => {
    const chatuse = JSON.parse(localStorage.getItem('Chatuse'));
    const chatID = chatuse.chatID;
    console.log('ChatID:', chatID);
    try {
      const response = await axios.get(`https://domestic-violence-chatbot-1.onrender.com/api/loaddetails/${chatID}`);
      console.log('chatHistory:', response.data);
      setChatHistory(response.data);
    } catch (err) {
      console.error('Error fetching my chats:', err);
    }
  };

  const handleUserQuestion = async (event) => {
    console.log("user question", userQuestion);
    const question = userQuestion;
    const chatID = JSON.parse(localStorage.getItem('Chatuse')).chatID;
    
    try {
      const response = await axios.get(`https://domestic-violence-chatbot-1.onrender.com/api/storequestgetans`, {
        params: {
          chatID: chatID,
          question: question,
          chatHistory: chatHistory
        }
      });
      console.log('Response:', response.data);
      setChatHistory([]);
      setUserQuestion('');
      await loadanswers();
    } catch (err) {
      console.log("user question not processed properly");
    }
  };

  const AddChat = async () => {
    console.log('Add Chat');
    try {
      const newChatCount = chatCount + 1;
      const response = await axios.post(`https://domestic-violence-chatbot-1.onrender.com/api/createchat`, {
        userID: JSON.parse(localStorage.getItem('user')).userId,
        title: `Chat ${newChatCount}`
      });
      setUserChat([]);
      setChatCount(newChatCount);
      loadUserChat();
      onChatChange(response.data.chat);
    } catch {
      console.log('Error in adding chat');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('Chatuse');
    navigate('/');
  };

  const startEditing = (chatID, currentTitle) => {
    setEditingChatId(chatID);
    setNewChatTitle(currentTitle);
  };

  const updateChatTitle = async (chatID) => {
    try {
      await axios.post(`https://domestic-violence-chatbot-1.onrender.com/api/updateTitle`, {
        chatID: chatID,
        Title: newChatTitle
      });
      setEditingChatId(null);
      loadUserChat();
    } catch (err) {
      console.error('Error updating chat title:', err);
    }
  };

  return (
    <div className="flex h-screen antialiased text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900">
      <div className="flex flex-col md:flex-row h-full w-full overflow-x-hidden">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block md:flex md:flex-col py-8 pl-6 pr-2 w-full md:w-64 bg-white dark:bg-gray-800 flex-shrink-0 transition-all duration-300`}>
          <div className="flex flex-row items-center justify-between h-12 w-full">
            <button 
              className="flex items-center justify-center rounded-2xl text-indigo-700 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900 h-10 w-10" 
              onClick={AddChat}
            >
              <Plus size={24} />
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
              <span className="flex items-center justify-center bg-gray-300 dark:bg-gray-600 h-4 w-4 rounded-full">{chatCount}</span>
            </div>
            <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
              {userChat.map((chatbts) => (
                <div key={chatbts.chatID} className="flex flex-row items-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl p-2">
                  {editingChatId === chatbts.chatID ? (
                    <>
                      <input
                        type="text"
                        value={newChatTitle}
                        onChange={(e) => setNewChatTitle(e.target.value)}
                        className="flex-grow mr-2 px-2 py-1 rounded border"
                      />
                      <button onClick={() => updateChatTitle(chatbts.chatID)} className="text-green-500 hover:text-green-600">
                        <Check size={20} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="flex-grow text-left" onClick={() => onChatChange(chatbts)}>
                        <div className="flex items-center">
                          <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 dark:bg-indigo-700 rounded-full mr-2">1</div>
                          <div className="text-sm font-semibold">{chatbts.title}</div>
                        </div>
                      </button>
                      <button onClick={() => startEditing(chatbts.chatID, chatbts.title)} className="text-gray-500 hover:text-gray-600">
                        <Pencil size={16} />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="mt-auto flex items-center justify-center w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
          >
            <LogOut size={20} className="mr-2" />
            Logout
          </button>
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
                  <div key={chat._id} className="grid grid-cols-12 gap-y-2">
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
                  </div>
                ))}
              </div>
            </div>
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
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                  />
                </div>
              </div>
              <div className="ml-4">
                <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0" onClick={handleUserQuestion}>
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
}


export default ChatInterface;