import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
    return (
        <div
            className={`animate-pulse bg-zinc-800 rounded-md ${className}`}
            aria-hidden="true"
            {...props}
        />
    );
};

export default Skeleton;
