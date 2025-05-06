
# PeaceSync

PeaceSync is a comprehensive mental health application designed to support emotional wellbeing through a variety of features that help users track their mood, journal their thoughts, and connect with a supportive community.

![PeaceSync Dashboard](/placeholder.svg "PeaceSync Dashboard")

## Key Features

### Mood Tracking
- **Daily Mood Recording**: Track your emotional state throughout the day
- **Mood Visualization**: See patterns and trends in your emotional well-being over time
- **Mood Notes**: Add context to your mood entries
- **Custom Emotions**: Select from a range of emotions with visual indicators

### Personal Journal
- **Private Entries**: Write secure, encrypted journal entries
- **Rich Text Support**: Format your entries with styles and media
- **Mood Association**: Link journal entries with your current emotional state
- **Tagging System**: Organize entries by topics for better reflection
- **Search Functionality**: Easily find past entries by content or tags

### Community Blog
- **Shared Experiences**: Read and connect with posts from other users
- **Create Posts**: Share your own stories and insights with the community
- **Interactions**: React to posts with likes and leave supportive comments
- **User Profiles**: See who wrote posts and their contribution history
- **Moderation System**: Ensures a safe, supportive environment
- **Post Status**: Posts go through approval to maintain community standards

### AI Chatbot
- **24/7 Support**: Get assistance whenever you need it
- **Mental Health Resources**: Access information about coping strategies
- **Guided Exercises**: Receive suggestions for mindfulness practices
- **Crisis Support**: Get emergency resources when needed

### Breathing Exercises
- **Guided Breathing**: Follow visual cues for deep breathing exercises
- **Customizable Duration**: Set your preferred session length
- **Always Accessible**: Quick access from any page in the app
- **Visual Feedback**: Animated visual guidance for breathing techniques

### User Authentication
- **Secure Login**: Email and password authentication
- **User Profiles**: Personalized user experience
- **Role-Based Access**: Different permission levels (user, moderator)
- **Data Privacy**: Secure storage of personal information

## System Architecture

### Entity-Relationship (ER) Diagram

The following diagram illustrates the database structure and relationships between entities in PeaceSync:

![Entity Relationship Diagram](/public/diagrams/er-diagram.svg "PeaceSync Entity Relationship Diagram")

Key entities:
- **profiles**: User profile information linked to authentication
- **mood_entries**: Records of user mood data over time
- **journal_entries**: Private journal entries with rich content
- **blog_posts**: Community posts shared with others
- **blog_comments**: User comments on blog posts
- **blog_reactions**: User likes/reactions to blog posts

### Class Diagram

The application's component structure is represented in this class diagram:

![Class Diagram](/public/diagrams/class-diagram.svg "PeaceSync Class Diagram")

Major components:
- **AuthContext**: Manages user authentication state
- **App**: Main application container and routing
- **MoodTracker**: Handles mood recording and visualization
- **JournalEntry**: Manages journal content creation and editing
- **BlogPost**: Displays and manages interaction with community posts
- **Chatbot**: Provides AI-assisted support and resources

### Use Case Diagram

This diagram illustrates the main user interactions with the PeaceSync system:

![Use Case Diagram](/public/diagrams/use-case-diagram.svg "PeaceSync Use Case Diagram")

Primary use cases:
- Track and visualize mood
- Create and manage journal entries
- Read and interact with community blog posts
- Use guided breathing exercises
- Chat with AI support assistant

### Sequence Diagram

The following sequence diagram shows the flow of interactions for blog post engagement:

![Sequence Diagram](/public/diagrams/sequence-diagram.svg "Blog Post Interaction Sequence")

This sequence illustrates:
- Fetching blog posts from the database
- User interactions (likes, comments)
- Data persistence flow
- UI updates based on interactions

## Technical Implementation

### Frontend
- React with TypeScript for type safety
- Tailwind CSS for responsive styling
- Framer Motion for smooth animations and transitions
- Shadcn UI components for consistent design
- React Query for efficient data fetching
- React Router for navigation

### Backend
- Supabase for authentication and database management
- PostgreSQL database with row-level security policies
- Real-time updates for blog interactions
- Secure data storage for user information

### Data Security
- Row-level security ensures users only access their own data
- Encrypted storage for sensitive information
- Authentication with session management
- Proper security context for database views

## Application Structure
- Responsive design works on mobile, tablet, and desktop
- Intuitive navigation with consistent header and footer
- Theme support for light and dark modes
- Accessibility considerations throughout the interface

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser at `http://localhost:8080`

## Database Schema

The application uses several interconnected tables:
- `profiles`: User information and roles
- `mood_entries`: User mood tracking data
- `journal_entries`: Personal journal content
- `blog_posts`: Community shared content
- `blog_comments`: Interactions on blog posts
- `blog_reactions`: User reactions to posts

## Authentication Flow

PeaceSync implements a comprehensive authentication system:
1. Users can register with email and password
2. Login creates a secure session
3. Protected routes require authentication
4. User roles determine access levels
5. Row-level security ensures data privacy

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.
