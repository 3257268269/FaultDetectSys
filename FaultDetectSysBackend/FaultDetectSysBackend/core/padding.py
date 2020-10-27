def paddingCore(data):
    padding_num = 119.8888
    for i in range(len(data)):
        if data[i][1] == None:
            data[i][1] = padding_num

    return data