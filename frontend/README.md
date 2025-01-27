# Anonymous Game Chat

A real-time anonymous chat application that enables users to communicate securely and privately in game-like chat rooms.

## Features

- 🎭 Anonymous Communication
- 🎮 Game-like Chat Interface
- 🚀 Real-time Messaging
- 🏠 Multiple Chat Rooms
- 📱 Responsive Design
- 🔐 Secure Communication

## Tech Stack

### Frontend

- Next.js 14
- React
- Socket.io Client
- TailwindCSS

### Backend

- Node.js
- Express
- Socket.io
- MongoDB

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (for message storage)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/OlubodeMichael/anonymous-game.git
```

2. Install Frontend Dependencies:

```bash
cd frontend
npm install
```

3. Install Backend Dependencies:

```bash
cd backend
npm install
```

## Environment Setup

1. Create `.env` file in backend directory:

```env
PORT=3001
MONGODB_URI=your_mongodb_uri
```

2. Create `.env.local` file in frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Running the Application

1. Start the backend server:

```bash
cd backend
npm run dev
```

2. Start the frontend development server:

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` to view the application.

## Project Structure

```
├── frontend/
│   ├── app/
│   │   ├── page.js                 # Home page
│   │   ├── room/                   # Chat rooms
│   │   │   ├── page.js            # Room list
│   │   │   └── [id]/              # Individual room
│   │   └── _components/           # Shared components
│   └── ...
├── backend/
│   ├── src/
│   │   └── server.js              # Main server file
│   └── ...
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

Michael Olubode - [GitHub](https://github.com/OlubodeMichael)

Project Link: [https://github.com/OlubodeMichael/anonymous-game](https://github.com/OlubodeMichael/anonymous-game)

---

Built with ❤️ using Next.js and Node.js

## Additional Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Project-specific documentation links]
