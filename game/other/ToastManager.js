import toast from "../../src/stores/toast.js";

class  ToastManager{
    sendToast(message) {
        toast.set({
            show_code: Math.random(),
            value: message,
            flag: false,
        })
    }

    sendToastNoDestroy(message, call_back){
        toast.set({
            show_code: Math.random(),
            flag: true, // 设置为true，不自动关闭
            value: message,
            callback() {
                call_back()
            }
        })
    }

    closeToast(callback){
        toast.set({
            show_code: Math.random(),
            flag: "Now",
            value: " "

        })
        callback()
    }
}

export default new ToastManager()