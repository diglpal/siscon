import React from "react";

export default function ModalContent({ children }: any) {
	return <div className="p-4 h-[calc(100%-(2.75rem))]">{children}</div>;
}
