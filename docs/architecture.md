# System Architecture - Deepu AI Course Generator

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │    │   Express API   │    │    MongoDB      │
│   (Vite + TW)   │◄──►│   (Node.js)     │◄──►│   (Mongoose)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   AI Services   │    │   Auth Service  │    │   File Storage  │
│   (OpenAI API)  │    │     (JWT)       │    │     (AWS S3)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Core Services

### 1. Authentication Service
- JWT-based authentication
- Role-based access control
- Session management

### 2. Assessment Engine
- Diagnostic test generation
- Skill level classification
- Learning path recommendation

### 3. Content Management
- Course hierarchy management
- Multi-language content
- Video & text content delivery

### 4. AI Mentor System
- Performance analysis
- Personalized recommendations
- Code review & feedback

### 5. Progress Tracking
- Learning analytics
- Gamification engine
- Achievement system

### 6. Community Platform
- Discussion forums
- Peer interaction
- Project sharing

## Data Flow

1. **User Registration** → Diagnostic Test → Skill Assessment → Learning Path Generation
2. **Learning Session** → Progress Tracking → AI Analysis → Recommendations
3. **Community Interaction** → Content Sharing → Peer Reviews → Gamification

## Scalability Considerations

- Microservices architecture ready
- Database indexing for performance
- CDN for video content
- Caching layer (Redis)
- Load balancing support