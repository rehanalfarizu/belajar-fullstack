<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Product;
use App\Models\User;

final class ProductPolicy
{
    public function viewAny(?User $user): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        // TODO: hanya admin yang boleh membuat product.
        return false;
    }

    public function update(User $user, Product $product): bool
    {
        // TODO: definisikan aturan update.
        return false;
    }

    public function delete(User $user, Product $product): bool
    {
        // TODO: definisikan aturan delete.
        return false;
    }
}
