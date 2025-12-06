import { useState } from "react";

function PasswordConfirmModal({ visible, onClose, onConfirm }) {
    const [password, setPassword] = useState("");

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[350px] shadow-xl">
                <h2 className="text-xl font-semibold mb-3">
                    Confirm Your Password
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                    Please enter your password to change your email.
                </p>

                <input
                    type="password"
                    className="w-full border rounded-lg px-3 py-2 mb-4"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded-md"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="px-4 py-2 bg-(--color-primary) text-white rounded-md"
                        onClick={() => onConfirm(password)}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PasswordConfirmModal;
