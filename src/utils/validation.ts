// src/utils/validation.ts

export const validateName = (name: string): string | null => {
    if (!name) {
        return "Tên không được để trống.";
    }
    return null;
};

export const validateEmail = (email: string): string | null => {
    if (!email) {
        return "Vui lòng nhập địa chỉ email.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Địa chỉ email không hợp lệ.";
    }
    return null;
};

export const validatePassword = (password: string): string | null => {
    if (!password) {
        return "Mật khẩu không được để trống.";
    }

    if (password.length < 6) {
        return "Mật khẩu cần ít nhất 6 ký tự.";
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
        return "Mật khẩu phải chứa ít nhất 1 chữ cái và 1 số.";
    }
    return null;
};

export const validateOtp = (otp: string): string | null => {
    if (!otp) {
        return "Vui lòng nhập mã OTP.";
    }

    if (otp.length !== 6) {
        return "Mã OTP phải có đúng 6 ký tự.";
    }
    return null;
};

export const validateUserType = (userType: string): string | null => {
    if (!userType) {
        return "Vui lòng chọn loại tài khoản.";
    }
    return null;
};

export const validateInputs = (name: string, email: string, password: string, otp: string, userType: string) => {
    return {
        name: validateName(name),
        email: validateEmail(email),
        password: validatePassword(password),
        otp: validateOtp(otp),
        userType: validateUserType(userType),
    };
};