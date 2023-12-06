import os
import subprocess
from app import config

FNULL = open(os.devnull, 'wb')


def doping(ip):
    if (config.SO == "linux"):
        res = subprocess.Popen(
            ["/bin/ping", "-c1", "-w2", ip], stdout=subprocess.PIPE).wait()
    else:
        with open(os.devnull, "wb") as limbo:
            res = subprocess.Popen(["ping", "-n", "1", "-w", "200", ip],
                                   stdout=limbo, stderr=limbo).wait()
    if res == 0:
        resultado = "up"
    else:
        resultado = "down"

    return resultado
