// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// const FileUploadWithChatbot = () => {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');
//   const [chatOpen, setChatOpen] = useState(false);
//   const [chatHistory, setChatHistory] = useState([]);

//   // Handle file upload selection
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // Handle text input in chatbot
//   const handleMessageChange = (e) => {
//     setMessage(e.target.value);
//   };

//   // Submit the file to the backend
//   const handleSubmitFile = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       alert('Please select a file to upload');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       // Post file to upload endpoint
//       const response = await axios.post('https://multimodal-backend.onrender.com/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('File uploaded successfully:', response.data);
//       // Open chatbot window
//       setChatOpen(true);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert('File upload failed');
//     }
//   };

//   // Handle sending a message in the chatbot
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!message) {
//       alert('Please enter a message');
//       return;
//     }

//     try {
//       // Post the message to the query endpoint
//       const response = await axios.post('https://multimodal-backend.onrender.com/query', { query: message });
//       console.log('Message sent successfully:', response.data);

//       // Update chat history with the new message and response
//       setChatHistory([...chatHistory, { user: message, bot: response.data.base_response }]);
//       setMessage(''); // Clear the input field
//     } catch (error) {
//       console.error('Error sending message:', error);
//       alert('Message sending failed');
//     }
//   };

//   return (
//     <div>
//       {!chatOpen ? (
//         <form onSubmit={handleSubmitFile}>
//           <h2>Upload a File</h2>
//           <input type="file" onChange={handleFileChange} accept=".pdf,.csv,.docx" />
//           <button type="submit">Submit</button>
//         </form>
//       ) : (
//         <div className="chat-container">
//           <div className="chat-history">
//             {chatHistory.map((chat, index) => (
//               <div key={index}>
//                 <p className="user-message">
//                   <strong>You:</strong> {chat.user}
//                 </p>
//                 <p className="bot-message">
//                   <strong>Bot:</strong> {chat.bot}
//                 </p>
//               </div>
//             ))}
//           </div>
//           <form className="chat-input-form" onSubmit={handleSendMessage}>
//             <input
//               type="text"
//               value={message}
//               onChange={handleMessageChange}
//               placeholder="Type your message..."
//             />
//             <button type="submit">Send</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUploadWithChatbot;

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const FileUploadWithChatbot = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

  // Handle file upload selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle text input in chatbot
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Submit the file to the backend
  const handleSubmitFile = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true); // Start the loading state for upload
      const response = await axios.post('https://multimodal-backend.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully:', response.data);
      setChatOpen(true);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('File upload failed');
    } finally {
      setUploading(false); // End the loading state for upload
    }
  };

  // Handle sending a message in the chatbot
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message) {
      alert('Please enter a message');
      return;
    }

    try {
      setSendingMessage(true); // Start the loading state for message sending
      const response = await axios.post('https://multimodal-backend.onrender.com/query', { query: message });
      console.log('Message sent successfully:', response.data);

      // Update chat history with the new message and response
      setChatHistory([...chatHistory, { user: message, bot: response.data.base_response }]);
      setMessage(''); // Clear the input field
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Message sending failed');
    } finally {
      setSendingMessage(false); // End the loading state for message sending
    }
  };

  return (
    <div>
      {!chatOpen ? (
        <form onSubmit={handleSubmitFile}>
          <h2>Upload a File</h2>
          <input type="file" onChange={handleFileChange} accept=".pdf,.csv,.docx" />
          <button type="submit" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Submit'}
          </button>
        </form>
      ) : (
        <div className="chat-container">
          <div className="chat-history">
            {chatHistory.map((chat, index) => (
              <div key={index}>
                <p className="user-message">
                  <strong>You:</strong> {chat.user}
                </p>
                <p className="bot-message">
                  <strong>Bot:</strong> {chat.bot}
                </p>
              </div>
            ))}
          </div>
          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={message}
              onChange={handleMessageChange}
              placeholder="Type your message..."
              disabled={sendingMessage}
            />
            <button type="submit" disabled={sendingMessage}>
              {sendingMessage ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FileUploadWithChatbot;
