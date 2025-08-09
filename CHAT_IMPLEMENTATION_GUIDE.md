# Chat Implementation Guide - 모두의 권리

## 🎯 Overview

This guide outlines how to implement the chat functionality shown in the Figma design.

## 🏗️ Architecture Requirements

### Backend Changes

1. **New Entities**:
```typescript
// Message Entity
@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column()
  senderId: number;

  @Column()
  receiverId: number;

  @Column()
  consultationId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'receiverId' })
  receiver: User;

  @ManyToOne(() => Consultation)
  @JoinColumn({ name: 'consultationId' })
  consultation: Consultation;

  @CreateDateColumn()
  createdAt: Date;
}
```

2. **New API Endpoints**:
```typescript
// Messages Controller
@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  @Get('consultation/:consultationId')
  async getMessages(@Param('consultationId') consultationId: string) {
    return this.messagesService.findByConsultation(+consultationId);
  }

  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }
}
```

3. **Real-time Communication**:
```typescript
// WebSocket Gateway
@WebSocketGateway()
export class ChatGateway {
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, consultationId: string) {
    client.join(`consultation_${consultationId}`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: { consultationId: string; content: string }) {
    // Save message to database
    // Broadcast to room
    this.server.to(`consultation_${payload.consultationId}`).emit('newMessage', payload);
  }
}
```

### Frontend Changes

1. **New Chat Page**:
```typescript
// pages/chat/[consultationId].tsx
export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  // WebSocket connection
  const socket = useSocket();
  
  // Send message
  const sendMessage = () => {
    socket.emit('sendMessage', { consultationId, content: newMessage });
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <div className="bg-white border-b p-4">
        <h1>에어컨 청소 업체 A</h1>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
      
      {/* Message Input */}
      <div className="bg-white border-t p-4">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="+ 메시지 입력하세요"
          className="w-full p-2 border rounded"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
```

2. **WebSocket Hook**:
```typescript
// hooks/useSocket.ts
export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return socket;
};
```

## 🎨 UI Components

### Message Bubble Component
```typescript
interface MessageBubbleProps {
  message: {
    content: string;
    senderId: number;
    createdAt: Date;
  };
  currentUserId: number;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, currentUserId }) => {
  const isOwnMessage = message.senderId === currentUserId;
  
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs px-4 py-2 rounded-lg ${
        isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'
      }`}>
        <p>{message.content}</p>
        <p className="text-xs opacity-75 mt-1">
          {new Date(message.createdAt).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};
```

## 🔧 Implementation Steps

### Phase 1: Backend Setup
1. **Create Message Entity**
2. **Add Message Service**
3. **Create Message Controller**
4. **Set up WebSocket Gateway**

### Phase 2: Frontend Setup
1. **Create Chat Page**
2. **Add WebSocket Integration**
3. **Create Message Components**
4. **Add Chat Navigation**

### Phase 3: Integration
1. **Connect Chat to Consultations**
2. **Add Real-time Updates**
3. **Implement Message Notifications**
4. **Add Chat History**

## 🎯 Features to Implement

1. **Real-time Messaging**
   - WebSocket connection
   - Message broadcasting
   - Typing indicators

2. **Chat Interface**
   - Message bubbles
   - Timestamps
   - User avatars
   - Message status (sent, delivered, read)

3. **Chat Management**
   - Chat history
   - Message search
   - File attachments
   - Message reactions

4. **User Experience**
   - Push notifications
   - Unread message counts
   - Chat list
   - Online status

## 🚀 Quick Implementation

If you want to implement this quickly for the assessment:

1. **Simple Chat Page**: Create a basic chat interface without real-time features
2. **Mock Data**: Use static messages for demonstration
3. **Basic UI**: Implement the chat UI shown in Figma
4. **Navigation**: Add chat links to consultations

## 📊 Assessment Impact

**Adding chat would:**
- ✅ **Enhance** your application significantly
- ✅ **Demonstrate** advanced full-stack skills
- ✅ **Show** real-time communication capabilities
- ⚠️ **Require** additional development time
- ⚠️ **Add** complexity to the project

## 🎯 Recommendation

**For the assessment, your current implementation is already excellent and complete.** The chat feature would be a nice enhancement but isn't required for demonstrating your full-stack development skills.

**If you have time and want to impress, implement the chat feature. If you want to focus on polishing your current implementation, that's perfectly fine too!** 