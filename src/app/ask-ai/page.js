"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  SendHorizontal,
  Bot,
  UserCircle,
  Copy,
  Loader2,
  PlusCircle,
  MessageSquareText,
  Trash2,
  Share2,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import LeftSideBar from "@/components/LeftSideBar";
import UserAvatar from "@/components/UserAvatar";

// A simple unique ID generator
const generateId = () => Math.random().toString(36).substr(2, 9);

const mockAIResponses = [
  {
    keywords: ["hello", "hi", "hey"],
    response:
      "Hello there! How can I assist you with your coding questions today in CodeChain?",
  },
  {
    keywords: ["python", "indentation", "curly braces"],
    response:
      'Python uses indentation to define blocks of code, unlike languages like C++, Java, or JavaScript which use curly braces {}. This design choice emphasizes readability and consistency. For example:\n```python\ndef greet(name):\n  if name: # Indentation starts a block\n    print(f"Hello, {name}!")\n  else:\n    print("Hello, world!") # Another block\n# No more indentation, block ends\ngreet("Developer")\n```\nThis strict indentation can sometimes catch beginners off guard but leads to cleaner code once mastered.',
  },
  {
    keywords: ["javascript", "async", "await"],
    response:
      "In JavaScript, `async` and `await` are keywords that simplify working with promises, making asynchronous code look and behave a bit more like synchronous code.\n\nAn `async` function implicitly returns a promise. The `await` keyword can only be used inside an `async` function and it pauses the execution of the async function until the promise is resolved or rejected.\n\nHere's a quick example:\n```javascript\nasync function fetchData() {\n  try {\n    const response = await fetch('https://api.example.com/data');\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const data = await response.json();\n    console.log(data);\n    return data;\n  } catch (error) {\n    console.error('Could not fetch data:', error);\n  }\n}\n\nfetchData();\n```\nThis makes asynchronous operations much easier to read and manage.",
  },
  {
    keywords: ["jvm", "java"],
    response:
      "The Java Virtual Machine (JVM) is an essential part of the Java platform. It's an abstract computing machine that enables a computer to run Java programs as well as programs written in other languages that are also compiled to Java bytecode. \n\nKey reasons why JVM is needed:\n1.  **Platform Independence**\n2.  **Memory Management**\n3.  **Security**\n```plaintext\nYour Java Code (.java) --[Compiler]--> Bytecode (.class) --[JVM]--> Native Machine Code\n```",
  },
];

const getMockAIResponse = (userInput) => {
  const lowerInput = userInput.toLowerCase();
  for (const item of mockAIResponses) {
    if (item.keywords.some((keyword) => lowerInput.includes(keyword))) {
      return item.response;
    }
  }
  return "I'm still learning! I couldn't find a specific answer for that. Try asking about 'Python indentation', 'Java JVM', or 'JavaScript async/await'.";
};

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      toast.success("Code copied!", {
        position: "top-center",
        style: { background: "#333", color: "#fff" },
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="bg-black/60 rounded-md my-2 relative group shadow-inner">
      <pre className="p-4 text-sm overflow-x-auto whitespace-pre-wrap font-mono text-cyan-400 selection:bg-cyan-700 selection:text-cyan-100 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-black/50">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 bg-zinc-700 hover:bg-zinc-600 rounded-md text-zinc-300 opacity-0 group-hover:opacity-100 transition-all duration-200"
        aria-label="Copy code"
      >
        {copied ? (
          <Copy size={16} className="text-green-400" />
        ) : (
          <Copy size={16} />
        )}
      </button>
    </div>
  );
};

const ChatMessage = ({ message, onPostToCommunity, userQuestionText }) => {
  const { sender, text, timestamp } = message;
  const parts = text.split(/(\`\`\`[\s\S]*?\`\`\`)/g);

  return (
    <div
      className={`flex mb-5 animate-fadeIn ${
        sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div className={`flex items-end gap-2.5 max-w-[85%] md:max-w-[80%]`}>
        {sender === "ai" && (
          <div className="flex-shrink-0 p-2 bg-gradient-to-tr from-gray-300 to-gray-900 rounded-full self-start shadow-md">
            <Bot size={20} className="text-white" />
          </div>
        )}
        <div
          className={`p-3 md:p-4 rounded-xl shadow-lg relative ${
            sender === "user"
              ? "bg-zinc-700 text-white rounded-br-none"
              : " text-zinc-200 rounded-bl-none border border-zinc-700/50"
          }`}
        >
          {parts.map((part, index) => {
            if (part.startsWith("```") && part.endsWith("```")) {
              const codeContent = part
                .substring(part.indexOf("\n") + 1, part.length - 3)
                .trim();
              return <CodeBlock key={index} code={codeContent} />;
            }
            return (
              <p
                key={index}
                className="whitespace-pre-wrap leading-relaxed break-words"
              >
                {part}
              </p>
            );
          })}
          {timestamp && (
            <p
              className={`text-xs mt-2 ${
                sender === "user" ? "text-blue-200 text-right" : "text-zinc-500"
              }`}
            >
              {timestamp}
            </p>
          )}
          {sender === "ai" && userQuestionText && (
            <button
              onClick={() => onPostToCommunity(userQuestionText, text)}
              className="absolute -top-2 -right-2 p-1.5 bg-amber-500 hover:bg-amber-400 rounded-full text-white shadow-md transition-all hover:scale-110"
              title="Post this Q&A to community"
            >
              <Share2 size={14} />
            </button>
          )}
        </div>
        {sender === "user" && (
          <div className="flex-shrink-0 pl-3  rounded-full self-start shadow-md">
            <UserAvatar size={40} />
          </div>
        )}
      </div>
    </div>
  );
};

const initialChatId = generateId();
const initialChats = [
  {
    id: initialChatId,
    title: "Welcome Chat",
    messages: [
      {
        id: generateId(),
        sender: "ai",
        text: "Welcome to CodeChain AI! Ask me anything about coding.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ],
    createdAt: Date.now(),
  },
];

export default function AICodeChatPage() {
  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState(initialChatId);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chats, activeChatId, isTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = parseInt(
        getComputedStyle(textareaRef.current).maxHeight,
        10
      ); // Get max-h-40 in pixels

      // Set height based on scroll height, but not exceeding max height
      textareaRef.current.style.height = `${Math.min(
        scrollHeight,
        maxHeight
      )}px`;
    }
  }, [inputValue]);

  const currentChat = chats.find((chat) => chat.id === activeChatId);
  const currentMessages = currentChat?.messages || [];

  const updateMessagesInChat = (chatId, newMessagesArray) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, messages: newMessagesArray } : chat
      )
    );
  };

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || !activeChatId) return;

    const userMessage = {
      id: generateId(),
      sender: "user",
      text: inputValue.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedMessages = [...currentMessages, userMessage];
    updateMessagesInChat(activeChatId, updatedMessages);

    if (currentMessages.filter((m) => m.sender === "user").length === 0) {
      const newTitle =
        inputValue.trim().substring(0, 30) +
        (inputValue.trim().length > 30 ? "..." : "");
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChatId ? { ...chat, title: newTitle } : chat
        )
      );
    }

    setInputValue("");
    setIsTyping(true);
    // Reset textarea height after send
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    setTimeout(() => {
      const aiTextResponse = getMockAIResponse(userMessage.text);
      const aiMessage = {
        id: generateId(),
        sender: "ai",
        text: aiTextResponse,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        userQuestionId: userMessage.id,
      };
      updateMessagesInChat(activeChatId, [...updatedMessages, aiMessage]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleTextareaKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    const newChatId = generateId();
    const newChat = {
      id: newChatId,
      title: "New Chat",
      messages: [
        {
          id: generateId(),
          sender: "ai",
          text: "New chat started. What's on your mind?",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
      createdAt: Date.now(),
    };
    setChats((prevChats) => [newChat, ...prevChats]);
    setActiveChatId(newChatId);
  };

  const handleDeleteChat = (chatIdToDelete) => {
    setChats((prevChats) =>
      prevChats.filter((chat) => chat.id !== chatIdToDelete)
    );
    if (activeChatId === chatIdToDelete) {
      setActiveChatId(
        chats.length > 1
          ? chats.find((c) => c.id !== chatIdToDelete)?.id || null
          : null
      );
    }
    toast.success("Chat deleted", {
      style: { background: "#333", color: "#fff" },
    });
  };

  const handlePostToCommunity = (question, answer) => {
    console.log("Posting to community:", { question, answer });
    toast.success("Q&A ready to be posted to community! (Simulated)", {
      duration: 4000,
      icon: "🚀",
      style: { background: "#333", color: "#fff" },
    });
  };

  const getUserQuestionForAIMessage = (aiMessage) => {
    if (!aiMessage.userQuestionId) return null;
    return currentMessages.find((m) => m.id === aiMessage.userQuestionId)?.text;
  };

  return (
    <div className="flex h-[91.5vh] antialiased text-zinc-300  relative overflow-hidden">
      <style jsx>{`
        .scroll-area {
          overflow-y: auto;
        }

        .scroll-area::-webkit-scrollbar {
          width: 6px;
        }

        .scroll-area::-webkit-scrollbar-thumb {
          background-color: rgba(231, 135, 39, 0.6);
          border-radius: 3px;
        }

        .scroll-area::-webkit-scrollbar-thumb:hover {
          background-color: rgba(231, 135, 39, 0.6);
        }

        .scroll-area {
          scrollbar-width: thin;
          scrollbar-color: rgba(231, 135, 39, 0.6) transparent;
        }
      `}</style>

      <Toaster position="bottom-center" />
      <div
        className="absolute inset-0 z-0 opacity-70"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(200,200,200,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(200,200,200,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "35px 35px",
        }}
      ></div>

      <LeftSideBar className="w-64 md:w-72  border-r shadow-2xl">
        <button
          onClick={handleNewChat}
          className="flex items-center justify-center space-x-2 w-full p-3 bg-[#eb5e28] hover:bg-[#eb5e37] text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#eb5328] shadow-md"
        >
          <PlusCircle size={20} />
          <span>New Chat</span>
        </button>

        <div className="flex-1 w-full scroll-area  overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-zinc-600">
          {chats
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-150 group animate-slideInLeft
                ${
                  activeChatId === chat.id
                    ? "bg-green-700 text-white shadow-md"
                    : "hover:bg-zinc-700/60 text-zinc-300"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 overflow-hidden">
                    <MessageSquareText
                      size={18}
                      className={
                        activeChatId === chat.id
                          ? "text-sky-200"
                          : "text-zinc-400 group-hover:text-sky-300"
                      }
                    />
                    <span className="font-medium text-sm truncate">
                      {chat.title}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat.id);
                    }}
                    className={`p-1 rounded hover:bg-red-500/80 text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity
                    ${
                      activeChatId === chat.id &&
                      "opacity-100 text-sky-200 hover:text-white"
                    }`}
                    title="Delete chat"
                  >
                    <Trash2 size={16} className="text-white" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </LeftSideBar>

      <div className="flex-1 flex flex-col overflow-hidden z-10 ml-64 md:ml-72">
        <main className="flex-1  overflow-y-auto p-4 md:p-6 space-y-1 scroll-area">
          {currentMessages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onPostToCommunity={handlePostToCommunity}
              userQuestionText={
                msg.sender === "ai" ? getUserQuestionForAIMessage(msg) : null
              }
            />
          ))}
          {isTyping && activeChatId && (
            <div className="flex justify-start mb-4 animate-fadeIn">
              <div className="flex items-end gap-2.5">
                <div className="flex-shrink-0 p-2 bg-gradient-to-tr from-gray-300 to-gray-900 rounded-full self-start shadow-md">
                  <Bot size={20} className="text-white" />
                </div>
                <div className="p-3 md:p-4 rounded-xl  text-zinc-200 rounded-bl-none shadow-md border border-zinc-700/50">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-zinc-400 text-sm">
                      AI is thinking
                    </span>
                    <Loader2 size={16} className="animate-spin text-sky-400" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </main>

        <footer className="bg-transparent   p-2 md:p-4 ">
          <form
            onSubmit={handleSendMessage}
            className="flex items-end space-x-2 md:space-x-3 max-w-3xl mx-auto"
          >
            {/* New wrapper for textarea to mimic SearchBar styling */}
            <div className="flex-1 flex items-center p-0 rounded-lg bg-white/10 backdrop-blur-2xl border border-white/20 hover:backdrop-blur-0 focus-within:opacity-100 hover:border-transparent hover:shadow-[0_0_20px_2px_#eb5e28] focus-within:shadow-[0_0_20px_2px_#eb5e28] focus-within:backdrop-blur-0 focus-within:border-transparent transition-all duration-[800ms] opacity-95 hover:opacity-100 scroll-area">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleTextareaKeyDown}
                placeholder="Search or ask a question..." // Updated placeholder
                className="w-full px-4 py-3 bg-transparent text-white placeholder:text-[#ccc5b9] focus:outline-none resize-none max-h-40 scroll-area  overflow-y-auto " // Adjusted padding, added rounded-full
                rows="1"
                disabled={!activeChatId || isTyping} // Note: disabled style might need custom handling for this complex bg
              />
            </div>
            <button
              type="submit"
              disabled={isTyping || !inputValue.trim() || !activeChatId}
              className="p-3 bg-[#eb5e28] hover:bg-[#eb5e37] text-white rounded-full  disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0 self-end focus:ring-2 focus:bg-[#eb5e37] focus:outline-none shadow-md"
              aria-label="Send message"
            >
              <SendHorizontal size={22} />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}
