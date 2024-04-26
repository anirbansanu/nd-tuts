class ResponseUtil {
    static makeResponse(message, data) {
      return {
        success: true,
        data: data,
        message: message,
      };
    }
  
    static makeError(message, data = {}) {
      const res = {
        success: false,
        message: message,
      };
  
      if (Object.keys(data).length > 0) {
        res.data = data;
      }
  
      return res;
    }
}
  
module.exports = { ResponseUtil };
  