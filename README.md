# GMC Hackathon - compiler
This project was part of the presentation of our Solution. It consists of a compiler feature for GMC plateforme. 
## Server Setup
We were using Judge0, open-source online code execution system.
We recommend that you host it in (Ubuntu 20.04) machine, or you downgrade your default cgroup V2 to cgroup V1 to avoid later bugs
> https://github.com/judge0/judge0/issues/325

#### Judge0 installation
```
cd judge0-v1.13.0
docker-compose up -d db redis
sleep 10s
docker-compose up -d
sleep 5s
```
We are running server with http protocol for hackathon purpose, this guide will help you setup SSL : https://github.com/judge0/judge0/blob/master/CHANGELOG.md#deployment-procedure

#### judge0 Server
It's serving on localhost port 2358, 
For testing purpose, you can send POST request to "http://localhost:2358/submissions?wait=true" with request body :
```
{
    "source_code": "#include <stdio.h>\n\nint main(void) {\n  char name[10];\n  scanf(\"%s\", name);\n  printf(\"hello, %s\\n\", name);\n  return 0;\n}",
    "language_id": "4",
    "number_of_runs": "1",
    "stdin": "Judge0",
    "expected_output": "hello, Judge0",
    "cpu_time_limit": "2",
    "cpu_extra_time": "0.5",
    "wall_time_limit": "5",
    "memory_limit": "128000",
    "stack_limit": "64000",
    "max_processes_and_or_threads": "30",
    "enable_per_process_and_thread_time_limit": false,
    "enable_per_process_and_thread_memory_limit": true,
    "max_file_size": "1024"
}
```

#### Get Public IP
In order to access that endpoint from the internet, we used Ngrok to bind on localhost:2358 
> https://ngrok.com/


## Client Setup
In /routes/view/home.py : change "PUT_YOUR_Domain_here" with the domain name of judge0 server

Run main.py to start the flask app.


