import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import type { PaginationMeta } from "types/pagination";

interface PaginationSectionProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export default function PaginationSection(props: PaginationSectionProps) {
  const handlePrev = () => {
    if (props.meta.page > 1) {
      props.onPageChange(props.meta.page - 1);
    }
  };

  const handleNext = () => {
    const totalPages = Math.ceil(props.meta.total / props.meta.take);
    if (props.meta.page < totalPages) {
      props.onPageChange(props.meta.page + 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={handlePrev} className="cursor-pointer">
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>{props.meta.page}</PaginationLink>
        </PaginationItem>
        <PaginationItem onClick={handleNext} className="cursor-pointer">
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
