import { ShoppingBagIcon } from "lucide-react";

type EmptyStateProps = {
  description: string;
}

const EmptyState = ({ description }: EmptyStateProps) => {
  return (
    <div className="text-gray-500">
      <ShoppingBagIcon className="mx-auto mb-2" />
      <p className="text-center">{description}</p>
    </div>
  );
}

export default EmptyState;