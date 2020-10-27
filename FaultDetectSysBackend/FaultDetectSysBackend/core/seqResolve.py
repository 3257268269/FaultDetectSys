# 参考文档：https://www.statsmodels.org/stable/generated/statsmodels.tsa.seasonal.DecomposeResult.html#statsmodels.tsa.seasonal.DecomposeResult 
# 参考文档参见最下方Properties

#from statsmodels.tsa.seasonal import STL
import random

def seqResolveCore(data):
    # stl = STL(data, period=3, seasonal=11)
    # res = stl.fit()
    # print(res.seasonal)
    # print(res.resid)
    # print(res.trend)
    # return res.seasonal, res.resid, res.trend

    #10-26 随机打乱
    seasonal = data[:]
    resid = data[:]
    trend = data[:]

    random.shuffle(seasonal)
    random.shuffle(resid)
    random.shuffle(trend)

    return seasonal, resid, trend




