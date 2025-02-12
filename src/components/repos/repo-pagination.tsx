import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface RepoPaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function RepoPagination({
  page,
  totalPages,
  onChange,
}: RepoPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious onClick={() => onChange(Math.max(1, page - 1))} />
        </PaginationItem>

        {page > 2 && (
          <PaginationItem className="cursor-pointer">
            <PaginationLink onClick={() => onChange(1)}>1</PaginationLink>
          </PaginationItem>
        )}

        {page > 3 && <PaginationEllipsis />}

        {page > 1 && (
          <PaginationItem className="cursor-pointer">
            <PaginationLink onClick={() => onChange(page - 1)}>
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem className="cursor-pointer">
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>

        {page < totalPages && (
          <PaginationItem className="cursor-pointer">
            <PaginationLink onClick={() => onChange(page + 1)}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {page < totalPages - 2 && <PaginationEllipsis />}

        {page < totalPages - 1 && (
          <PaginationItem className="cursor-pointer">
            <PaginationLink onClick={() => onChange(totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem className="cursor-pointer">
          <PaginationNext
            onClick={() => onChange(Math.min(totalPages, page + 1))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
