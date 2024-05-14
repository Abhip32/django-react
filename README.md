# Django Project README

## Project Dependencies
- asgiref==3.8.1
- Django==5.0.6
- django-cors-headers==4.3.1
- djangorestframework==3.15.1
- djangorestframework-simplejwt==5.3.1
- mysqlclient==2.2.4
- PyJWT==2.8.0
- sqlparse==0.5.0
- tzdata==2024.1

## Project Description
This Django project serves as a backend for an application. It utilizes Django REST framework for building APIs, along with JWT for authentication and CORS headers for handling Cross-Origin Resource Sharing.

## Setup Instructions
To set up the project locally, follow these steps:

1. Clone the repository:
     ```
       git clone <repository_url>
   ```
2.Navigate to the project directory:
 ```
 cd <project_directory>
```

3. Create a virtual environment:
```
python -m venv venv
```
Activate the virtual environment:
On Windows:
```
venv\Scripts\activate
```
On macOS/Linux:
```
source venv/bin/activate
```
4.Install project dependencies:
```
pip install -r requirements.txt
```
Run database migrations:
```
python manage.py migrate
```
Start the development server:
```
python manage.py runserver
Access the project at http://127.0.0.1:8000/
```

Deployment
This project is currently hosted at Viray.pythonanywhere.com.

To deploy the project to a server:

- 1. Set up the server environment (e.g., Apache, Nginx, Gunicorn).
- 2. Configure the server to serve the Django application.
- 3. Set appropriate environment variables for production settings.
- 4. Ensure all necessary dependencies are installed.
- 5. Migrate the database (if needed).
- 6. Start the server and ensure the application is accessible.
