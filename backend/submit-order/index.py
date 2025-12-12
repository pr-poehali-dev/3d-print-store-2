import json
import os
import base64
import psycopg2
from typing import Dict, Any
import uuid

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Бизнес: Принимает заказы на 3D печать с файлами моделей
    Args: event - dict с httpMethod, body, headers
          context - объект с request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        
        customer_name = body_data.get('name', '')
        customer_email = body_data.get('email', '')
        customer_phone = body_data.get('phone', '')
        technology = body_data.get('technology', '')
        material = body_data.get('material', '')
        description = body_data.get('description', '')
        file_base64 = body_data.get('file_base64', '')
        file_name = body_data.get('file_name', '')
        
        if not all([customer_name, customer_email, customer_phone, technology, description]):
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Missing required fields'}),
                'isBase64Encoded': False
            }
        
        file_url = None
        if file_base64 and file_name:
            try:
                import boto3
                
                s3 = boto3.client('s3',
                    endpoint_url='https://bucket.poehali.dev',
                    aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                    aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
                )
                
                file_data = base64.b64decode(file_base64)
                
                unique_filename = f"orders/{uuid.uuid4()}-{file_name}"
                
                s3.put_object(
                    Bucket='files',
                    Key=unique_filename,
                    Body=file_data,
                    ContentType='application/octet-stream'
                )
                
                file_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{unique_filename}"
            except Exception as e:
                return {
                    'statusCode': 500,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': f'File upload failed: {str(e)}'}),
                    'isBase64Encoded': False
                }
        
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        cur.execute(
            "INSERT INTO orders (customer_name, customer_email, customer_phone, technology, material, description, file_url, file_name, status) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id",
            (customer_name, customer_email, customer_phone, technology, material, description, file_url, file_name, 'new')
        )
        
        order_id = cur.fetchone()[0]
        conn.commit()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'order_id': order_id,
                'message': 'Заказ успешно создан'
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
