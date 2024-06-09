import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

const MyCard: React.FC<Props> = ({ children, className }) => {
  return (
    <Card className={`h-full border-white px-0 py-3 rounded-none  ${className}`}>
      <CardContent className="px-2">{children}</CardContent>
    </Card>
  );
};

export default MyCard;
