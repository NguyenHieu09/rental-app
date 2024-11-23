import React, { useState } from "react"
import { useSDK } from "@metamask/sdk-react"

// Định nghĩa kiểu cho signature
type Signature = string | null

const MyComponent: React.FC = () => {
    const { sdk } = useSDK()
    const [signedMessage, setSignedMessage] = useState<Signature>("")

    const handleConnectAndSign = async () => {
        try {
            if (!sdk) {
                console.error("SDK is not initialized")
                return
            }

            const message = "Your message here"
            const signature = await sdk.connectAndSign({ msg: message })

            // Kiểm tra nếu signature là một chuỗi hợp lệ
            if (typeof signature === "string") {
                setSignedMessage(signature)
            } else {
                console.error("Signature is not a valid string")
            }
        } catch (error) {
            console.error("Error in signing:", error)
        }
    }

    return (
        <div>
            <button onClick={handleConnectAndSign}>Connect and Sign</button>
            {signedMessage && <p>Signed Message: {signedMessage}</p>}
        </div>
    )
}

export default MyComponent
