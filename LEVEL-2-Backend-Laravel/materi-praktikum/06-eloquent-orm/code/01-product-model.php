<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class Product extends Model
{
    // TODO: definisikan fillable.
    protected $fillable = [];

    // TODO: definisikan casts untuk price, stock, dan is_active.
    protected function casts(): array
    {
        return [];
    }

    public function category(): BelongsTo
    {
        // TODO: return $this->belongsTo(Category::class);
        throw new \LogicException('TODO: implementasikan relasi category()');
    }

    public function scopeActive(Builder $query): Builder
    {
        // TODO: filter is_active = true.
        return $query;
    }

    public function scopeInStock(Builder $query): Builder
    {
        // TODO: filter stock > 0.
        return $query;
    }
}
