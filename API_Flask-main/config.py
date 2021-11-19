import cx_Oracle

username = 'system'
password = 'ledux'
ip = 'localhost'
port = 1521
SID = 'xe'
dsn_tns = cx_Oracle.makedsn(ip, port, SID)
encoding = 'UTF-8'

