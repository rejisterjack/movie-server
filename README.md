# 🎬 Movie Database API

A comprehensive REST API for managing movie databases with JWT authentication, built with NestJS, TypeORM, and PostgreSQL. Features Cloudinary integration for image uploads and complete CRUD operations.

## ✨ Features

- 🔐 **JWT Authentication** - Secure user registration and login
- 🎭 **Movie Management** - Full CRUD operations for movies
- 📸 **Image Upload** - Cloudinary integration for poster uploads
- 📄 **Pagination** - Efficient data retrieval with pagination
- 📚 **API Documentation** - Complete Swagger/OpenAPI documentation
- ✅ **Input Validation** - Comprehensive data validation with class-validator
- 🗄️ **PostgreSQL Database** - Robust data persistence with TypeORM
- 🔒 **Security** - bcrypt password hashing, SQL injection protection

## 🛠️ Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) - Progressive Node.js framework
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [TypeORM](https://typeorm.io/)
- **Authentication**: [JWT](https://jwt.io/) with [Passport](http://www.passportjs.org/)
- **Image Storage**: [Cloudinary](https://cloudinary.com/) CDN
- **Validation**: [class-validator](https://github.com/typestack/class-validator)
- **Documentation**: [Swagger/OpenAPI](https://swagger.io/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rejisterjack/movie-server.git
   cd movie-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env  # If available, or create .env file
   ```

   Configure your `.env` file:
   ```env
   # Database
   DATABASE_URL=postgresql://username:password@localhost:5432/movie_db

   # JWT
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=3600

   # Cloudinary (for image uploads)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # App
   PORT=3001
   NODE_ENV=development
   ```

4. **Database Setup**
   ```bash
   # Make sure PostgreSQL is running
   # The application will automatically create tables with TypeORM
   ```

5. **Run the application**
   ```bash
   # Development mode with hot reload
   npm run start:dev

   # Production build
   npm run build
   npm run start:prod
   ```

The API will be available at `http://localhost:3001`
Swagger documentation at `http://localhost:3001/api`

## 📋 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | ❌ |
| POST | `/auth/login` | User login | ❌ |
| POST | `/auth/profile` | Get user profile | ✅ |

### Movies

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/movies` | Create new movie | ✅ |
| GET | `/movies` | Get all movies (paginated) | ✅ |
| GET | `/movies/:id` | Get movie by ID | ✅ |
| PATCH | `/movies/:id` | Update movie | ✅ |
| DELETE | `/movies/:id` | Delete movie | ✅ |

### Image Upload

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/upload/image` | Upload image to Cloudinary | ✅ |

## 🔧 API Usage Examples

### 1. User Registration
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### 2. User Login
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
# Returns: {"access_token": "jwt-token-here"}
```

### 3. Upload Image
```bash
curl -X POST http://localhost:3001/upload/image \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/image.jpg"
# Returns: {"url": "https://cloudinary-url"}
```

### 4. Create Movie
```bash
curl -X POST http://localhost:3001/movies \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Inception",
    "publishingYear": 2010,
    "poster": "https://cloudinary-url-here"
  }'
```

### 5. Get Movies (Paginated)
```bash
curl -X GET "http://localhost:3001/movies?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📊 Data Models

### User
```typescript
{
  id: string;           // UUID
  email: string;        // Unique email
  password: string;     // Hashed password (excluded from responses)
  isActive: boolean;    // Account status
  createdAt: Date;      // Creation timestamp
  updatedAt: Date;      // Update timestamp
}
```

### Movie
```typescript
{
  id: string;           // UUID
  title: string;        // Movie title
  publishingYear: number; // Release year (1888-2026)
  poster: string;       // Cloudinary image URL
  createdAt: Date;      // Creation timestamp
  updatedAt: Date;      // Update timestamp
}
```

## 🧪 Testing

### Manual Testing with Postman
1. Import the provided Postman collection
2. Set environment variable: `baseUrl = http://localhost:3001`
3. Run requests in order: Register → Login → Upload → CRUD operations

### Automated Testing
```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Stateless authentication with expiration
- **Input Validation**: Comprehensive request validation
- **SQL Injection Protection**: Parameterized queries
- **CORS Configuration**: Proper cross-origin handling
- **File Upload Security**: Type and size validation

## 📸 Image Upload Process

1. **Upload Image**: Send image file to `/upload/image` endpoint
2. **Cloudinary Processing**: Image uploaded to Cloudinary with optimization
3. **URL Generation**: Secure Cloudinary URL returned
4. **Movie Creation**: Use returned URL when creating/updating movies

**Benefits:**
- ✅ No server storage costs
- ✅ Automatic image optimization
- ✅ Global CDN delivery
- ✅ Professional image processing

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-production-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Docker Deployment (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start:prod"]
```

### AWS Deployment
- **EC2**: Host the Node.js application
- **RDS**: PostgreSQL database
- **CloudFront + S3**: Static file serving (if needed)
- **Cloudinary**: Image hosting and CDN

## 📈 Performance Optimizations

- **Database Indexing**: Optimized queries with TypeORM
- **Pagination**: Efficient data retrieval
- **CDN Integration**: Fast global image delivery
- **Connection Pooling**: PostgreSQL connection reuse
- **Caching Ready**: Architecture supports Redis integration

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   ```bash
   # Check PostgreSQL is running
   sudo systemctl status postgresql

   # Verify DATABASE_URL in .env
   ```

2. **Cloudinary Upload Failed**
   ```bash
   # Check Cloudinary credentials in .env
   # Verify account has upload permissions
   ```

3. **JWT Token Invalid**
   ```bash
   # Check JWT_SECRET in .env
   # Verify token hasn't expired
   ```

### Debug Mode
```bash
# Enable debug logging
NODE_ENV=development DEBUG=* npm run start:dev
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - The progressive Node.js framework
- [TypeORM](https://typeorm.io/) - Amazing ORM for TypeScript
- [Cloudinary](https://cloudinary.com/) - Image management platform
- [PostgreSQL](https://www.postgresql.org/) - Advanced open source database

---

**Happy coding! 🎬✨**
