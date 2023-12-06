def comprobar_si_eduxunta(ip):
    ip = ip.split('.')
    if (int(ip[1]) > 79):
        return True
    else:
        return False
