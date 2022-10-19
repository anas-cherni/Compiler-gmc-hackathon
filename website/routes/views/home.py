from os import path
from re import L
from typing import Dict

import requests
from flask import json, render_template, request

from .route import web


@web.route('/')
def home():
    return render_template("dashboard.html")



challenges= dict({
    "test_challenge":"50",
    "second_challenge":"100",
})




@web.route('/send', methods=['POST'])
def search():
        print(request.json)
        data = request.json

        challenge_expected_output=''
        challenge_test_input=''
        if data['source_code']  and data['challenge_name']:
            expected_output_path= f"website/challenges/outputs/{data['challenge_name']}.txt"
            test_input_path= f"website/challenges/inputs/{data['challenge_name']}.txt"
            if path.exists(expected_output_path) and path.exists(test_input_path):
                with open(expected_output_path,mode='r',encoding='utf-8') as f:
                    challenge_expected_output = f.read()
                with open(test_input_path,mode='r',encoding='utf-8') as f:
                    challenge_test_input = f.read()
            else:
                return json.dumps({'error': 'Challenge not found'}), 404

            print(challenge_expected_output,challenge_test_input)
            try:
                # Change ngrok link with your link to judge0 server .. keep the same endpoint "/submissions?base64_encoded=true&wait=true"
                code_exec_res=requests.post('PUT_YOUR_Domain_here/submissions?base64_encoded=true&wait=true', json={
                'stdin': challenge_test_input,
                'source_code': data['source_code'],
                'language_id': challenges.get(data['challenge_name'],"50"),
                'expected_output': challenge_expected_output,
                'cpu_time_limit': '2',
                # "number_of_runs":null,
                # "expected_output":null,
                # "cpu_time_limit":null,
                # "cpu_extra_time":null,
                # "wall_time_limit":null,
                # "memory_limit":null,
                # "stack_limit":null,
                # "max_processes_and_or_threads":null,
                # "enable_per_process_and_thread_time_limit":null,
                # "enable_per_process_and_thread_memory_limit":null,
                # "max_file_size":null,
                # "enable_network":null
                })
                
                return code_exec_res.json()
            except Exception as e: 
                print(e)
        else: 
            return json.dumps({'error': 'Invalid data'})
