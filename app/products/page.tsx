export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { pageMetadata } from '@/lib/seo';

type FeedField = {
  attribute: string;
  requirement: string;
  dataType: string;
  description: string;
  example: string;
};

type FeedSection = {
  title: string;
  description: string;
  fields: FeedField[];
};

const FEED_SECTIONS: FeedSection[] = [
  {
    title: 'OpenAI Flags',
    description:
      'Use these flags to control discoverability and checkout inside ChatGPT. They do not change how products appear on your own site.',
    fields: [
      {
        attribute: 'is_eligible_search',
        requirement: 'Required',
        dataType: 'Boolean',
        description: 'Controls whether the product can be surfaced in ChatGPT search results.',
        example: 'true',
      },
      {
        attribute: 'is_eligible_checkout',
        requirement: 'Required',
        dataType: 'Boolean',
        description:
          'Allows direct purchase inside ChatGPT. is_eligible_search must be true for this to be enabled.',
        example: 'true',
      },
    ],
  },
  {
    title: 'Basic Product Data',
    description:
      'Provide core identifiers and descriptive fields so each product variant can be indexed and linked correctly.',
    fields: [
      {
        attribute: 'item_id',
        requirement: 'Required',
        dataType: 'String (alphanumeric)',
        description: 'Merchant product ID (unique per variant).',
        example: 'SKU12345',
      },
      {
        attribute: 'gtin',
        requirement: 'Optional',
        dataType: 'String (numeric)',
        description: 'Universal product identifier.',
        example: '123456789543',
      },
      {
        attribute: 'mpn',
        requirement: 'Optional',
        dataType: 'String (alphanumeric)',
        description: 'Manufacturer part number.',
        example: 'GPT5',
      },
      {
        attribute: 'title',
        requirement: 'Required',
        dataType: 'String (UTF-8 text)',
        description: 'Product title.',
        example: "Men's Trail Running Shoes Black",
      },
      {
        attribute: 'description',
        requirement: 'Required',
        dataType: 'String (UTF-8 text)',
        description: 'Full product description.',
        example: 'Waterproof trail shoe with cushioned sole...',
      },
      {
        attribute: 'url',
        requirement: 'Required',
        dataType: 'URL',
        description: 'Product detail page URL.',
        example: 'https://example.com/product/SKU12345',
      },
    ],
  },
  {
    title: 'Item Information',
    description:
      'Capture physical characteristics and product classification data for better filtering and relevance.',
    fields: [
      {
        attribute: 'brand',
        requirement: 'Required',
        dataType: 'String',
        description: 'Product brand.',
        example: 'OpenAI',
      },
      {
        attribute: 'condition',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Condition of product.',
        example: 'new',
      },
      {
        attribute: 'product_category',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Category path.',
        example: 'Apparel & Accessories > Shoes',
      },
      {
        attribute: 'material',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Primary material(s).',
        example: 'Leather',
      },
      {
        attribute: 'dimensions',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Overall dimensions.',
        example: '12x8x5 in',
      },
      {
        attribute: 'length',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Individual dimension.',
        example: '10',
      },
      {
        attribute: 'width',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Individual dimension.',
        example: '10',
      },
      {
        attribute: 'height',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Individual dimension.',
        example: '10',
      },
      {
        attribute: 'dimensions_unit',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Dimensions unit.',
        example: 'in',
      },
      {
        attribute: 'weight',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Product weight.',
        example: '1.5',
      },
      {
        attribute: 'item_weight_unit',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Product weight unit.',
        example: 'lb',
      },
      {
        attribute: 'age_group',
        requirement: 'Optional',
        dataType: 'Enum',
        description: 'Target demographic.',
        example: 'adult',
      },
    ],
  },
  {
    title: 'Media',
    description:
      'Provide visual and rich media assets to improve product trust and engagement in results.',
    fields: [
      {
        attribute: 'image_url',
        requirement: 'Required',
        dataType: 'URL',
        description: 'Main product image URL.',
        example: 'https://example.com/image1.jpg',
      },
      {
        attribute: 'additional_image_urls',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Additional product images.',
        example: 'https://example.com/image2.jpg,...',
      },
      {
        attribute: 'video_url',
        requirement: 'Optional',
        dataType: 'URL',
        description: 'Product video.',
        example: 'https://youtu.be/12345',
      },
      {
        attribute: 'model_3d_url',
        requirement: 'Optional',
        dataType: 'URL',
        description: '3D model asset.',
        example: 'https://example.com/model.glb',
      },
    ],
  },
  {
    title: 'Price and Promotions',
    description:
      'Define regular and promotional pricing attributes used for price display and offer comparisons.',
    fields: [
      {
        attribute: 'price',
        requirement: 'Required',
        dataType: 'Number + currency',
        description: 'Regular price.',
        example: '79.99 USD',
      },
      {
        attribute: 'sale_price',
        requirement: 'Optional',
        dataType: 'Number + currency',
        description: 'Discounted price.',
        example: '59.99 USD',
      },
      {
        attribute: 'sale_price_start_date',
        requirement: 'Optional',
        dataType: 'Date',
        description: 'Sale start date.',
        example: '2025-07-01',
      },
      {
        attribute: 'sale_price_end_date',
        requirement: 'Optional',
        dataType: 'Date',
        description: 'Sale end date.',
        example: '2025-07-15',
      },
      {
        attribute: 'unit_pricing_measure / base_measure',
        requirement: 'Optional',
        dataType: 'Number + unit',
        description: 'Unit price and base measure.',
        example: '16 oz / 1 oz',
      },
      {
        attribute: 'pricing_trend',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Lowest price in N months.',
        example: 'Lowest price in 6 months',
      },
    ],
  },
  {
    title: 'Availability and Inventory',
    description:
      'Provide stock state and timing details so ChatGPT can avoid showing unavailable products.',
    fields: [
      {
        attribute: 'availability',
        requirement: 'Required',
        dataType: 'Enum',
        description: 'Product availability.',
        example: 'in_stock',
      },
      {
        attribute: 'availability_date',
        requirement: 'Required if availability=pre_order',
        dataType: 'Date',
        description: 'Availability date for pre-order items.',
        example: '2025-12-01',
      },
      {
        attribute: 'expiration_date',
        requirement: 'Optional',
        dataType: 'Date',
        description: 'Remove product after date.',
        example: '2025-12-01',
      },
      {
        attribute: 'pickup_method',
        requirement: 'Optional',
        dataType: 'Enum',
        description: 'Pickup options.',
        example: 'in_store',
      },
      {
        attribute: 'pickup_sla',
        requirement: 'Optional',
        dataType: 'Number + duration',
        description: 'Pickup SLA.',
        example: '1 day',
      },
    ],
  },
  {
    title: 'Variants',
    description:
      'Describe how related SKUs vary across size, color, and custom option dimensions.',
    fields: [
      {
        attribute: 'group_id',
        requirement: 'Recommended if listing has variants',
        dataType: 'String',
        description: 'Shared group identifier.',
        example: 'SHOE123',
      },
      {
        attribute: 'listing_has_variations',
        requirement: 'Recommended',
        dataType: 'Boolean',
        description: 'Indicates whether listing has variants.',
        example: 'true',
      },
      {
        attribute: 'variant_dict',
        requirement: 'Recommended if listing has variants',
        dataType: 'Object',
        description: 'Map of variant attributes to option values.',
        example: 'color: Blue, size: 10',
      },
      {
        attribute: 'item_group_title',
        requirement: 'Optional',
        dataType: 'String (UTF-8 text)',
        description: 'Group product title.',
        example: "Men's Trail Running Shoes",
      },
      {
        attribute: 'color',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Variant color.',
        example: 'Blue',
      },
      {
        attribute: 'size',
        requirement: 'Recommended (apparel)',
        dataType: 'String',
        description: 'Variant size.',
        example: '10',
      },
      {
        attribute: 'size_system',
        requirement: 'Recommended (apparel)',
        dataType: 'Country code',
        description: 'Size system.',
        example: 'US',
      },
      {
        attribute: 'gender',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Gender target.',
        example: 'male',
      },
      {
        attribute: 'offer_id',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Offer identifier (SKU + seller + price).',
        example: 'SKU12345-Blue-79.99',
      },
      {
        attribute: 'Custom_variant1_category',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Custom variant dimension 1.',
        example: 'Size_Type',
      },
      {
        attribute: 'Custom_variant1_option',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Custom variant 1 option.',
        example: 'Petite / Tall / Maternity',
      },
      {
        attribute: 'Custom_variant2_category',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Custom variant dimension 2.',
        example: 'Wood_Type',
      },
      {
        attribute: 'Custom_variant2_option',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Custom variant 2 option.',
        example: 'Oak / Mahogany / Walnut',
      },
      {
        attribute: 'Custom_variant3_category',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Custom variant dimension 3.',
        example: 'Cap_Type',
      },
      {
        attribute: 'Custom_variant3_option',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Custom variant 3 option.',
        example: 'Snapback / Fitted',
      },
    ],
  },
  {
    title: 'Fulfillment',
    description:
      'Specify shipping methods, costs, delivery windows, and digital-product designation.',
    fields: [
      {
        attribute: 'shipping',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Shipping information payload.',
        example: 'US:CA:Overnight:16.00 USD:1:2:1:3',
      },
      {
        attribute: 'is_digital',
        requirement: 'Optional',
        dataType: 'Boolean',
        description: 'Indicates if the product is digital.',
        example: 'false',
      },
    ],
  },
  {
    title: 'Merchant Info',
    description:
      'Include seller attribution and policy URLs. For marketplaces with 3P sellers, include marketplace_seller.',
    fields: [
      {
        attribute: 'seller_name',
        requirement: 'Required / Display',
        dataType: 'String',
        description: 'Seller name.',
        example: 'Example Store',
      },
      {
        attribute: 'marketplace_seller',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Marketplace seller of record.',
        example: 'Marketplace Name',
      },
      {
        attribute: 'seller_url',
        requirement: 'Required',
        dataType: 'URL',
        description: 'Seller page URL.',
        example: 'https://example.com/store',
      },
      {
        attribute: 'seller_privacy_policy',
        requirement: 'Required if is_eligible_checkout=true',
        dataType: 'URL',
        description: 'Seller-specific privacy policy.',
        example: 'https://example.com/privacy',
      },
      {
        attribute: 'seller_tos',
        requirement: 'Required if is_eligible_checkout=true',
        dataType: 'URL',
        description: 'Seller-specific terms of service.',
        example: 'https://example.com/terms',
      },
    ],
  },
  {
    title: 'Returns',
    description:
      'Use return_deadline_in_days as the canonical return window field in the feed schema.',
    fields: [
      {
        attribute: 'accepts_returns',
        requirement: 'Optional',
        dataType: 'Boolean',
        description: 'Whether returns are accepted.',
        example: 'true',
      },
      {
        attribute: 'return_deadline_in_days',
        requirement: 'Optional',
        dataType: 'Integer',
        description: 'Days allowed for return.',
        example: '30',
      },
      {
        attribute: 'accepts_exchanges',
        requirement: 'Optional',
        dataType: 'Boolean',
        description: 'Whether exchanges are accepted.',
        example: 'false',
      },
      {
        attribute: 'return_policy',
        requirement: 'Required',
        dataType: 'URL',
        description: 'Return policy URL.',
        example: 'https://example.com/returns',
      },
    ],
  },
  {
    title: 'Performance Signals',
    description:
      'Optionally include popularity and return-rate metrics to support ranking and trust signals.',
    fields: [
      {
        attribute: 'popularity_score',
        requirement: 'Optional',
        dataType: 'Number',
        description: 'Popularity indicator.',
        example: '4.7',
      },
      {
        attribute: 'return_rate',
        requirement: 'Optional',
        dataType: 'Number',
        description: 'Return rate.',
        example: '2%',
      },
    ],
  },
  {
    title: 'Compliance',
    description:
      'Include warnings, disclaimers, and age restrictions to support legal and safety requirements.',
    fields: [
      {
        attribute: 'warning / warning_url',
        requirement: 'Recommended for checkout',
        dataType: 'String / URL',
        description: 'Product warnings or disclaimer links.',
        example: 'Contains lithium battery, or CA Prop 65 warning',
      },
      {
        attribute: 'age_restriction',
        requirement: 'Recommended',
        dataType: 'Number',
        description: 'Minimum purchase age.',
        example: '21',
      },
    ],
  },
  {
    title: 'Reviews and Q&A',
    description:
      'Supply aggregated review data and question-answer content to strengthen credibility and decision support.',
    fields: [
      {
        attribute: 'review_count',
        requirement: 'Optional',
        dataType: 'Integer',
        description: 'Number of product reviews.',
        example: '254',
      },
      {
        attribute: 'star_rating',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Average review score.',
        example: '4.50',
      },
      {
        attribute: 'store_review_count',
        requirement: 'Optional',
        dataType: 'Integer',
        description: 'Number of store reviews.',
        example: '2000',
      },
      {
        attribute: 'store_star_rating',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Average store rating.',
        example: '4.50',
      },
      {
        attribute: 'q_and_a',
        requirement: 'Recommended',
        dataType: 'List',
        description: 'List of question and answer pairs.',
        example: 'One question asks if the item is waterproof, answer: Yes',
      },
      {
        attribute: 'reviews',
        requirement: 'Recommended',
        dataType: 'List',
        description: 'List of review objects with rating and content fields.',
        example: 'Review objects include title, content, minRating, maxRating, and rating values',
      },
    ],
  },
  {
    title: 'Related Products',
    description:
      'List associated products for bundle suggestions and substitute recommendations.',
    fields: [
      {
        attribute: 'related_product_id',
        requirement: 'Recommended',
        dataType: 'String',
        description: 'Associated product IDs.',
        example: 'SKU67890',
      },
      {
        attribute: 'relationship_type',
        requirement: 'Recommended',
        dataType: 'Enum',
        description: 'Relationship type for associated products.',
        example: 'part_of_set',
      },
    ],
  },
  {
    title: 'Geo Tagging',
    description:
      'Define region-specific pricing and availability. target_countries uses the first list entry for item targeting.',
    fields: [
      {
        attribute: 'target_countries',
        requirement: 'Required',
        dataType: 'List',
        description: 'Target countries of the item (first entry used).',
        example: 'US',
      },
      {
        attribute: 'store_country',
        requirement: 'Required',
        dataType: 'String',
        description: 'Store country of the item.',
        example: 'US',
      },
      {
        attribute: 'geo_price',
        requirement: 'Optional',
        dataType: 'Number + currency',
        description: 'Region-specific price.',
        example: '79.99 USD (California)',
      },
      {
        attribute: 'geo_availability',
        requirement: 'Optional',
        dataType: 'String',
        description: 'Region-specific availability.',
        example: 'in_stock (Texas), out_of_stock (New York)',
      },
    ],
  },
];

export const metadata: Metadata = pageMetadata({
  title: 'Products Feed Reference',
  description:
    'OpenAI-aligned product feed reference for ChatGPT discovery and checkout eligibility, including required and optional fields, data types, and examples.',
  pathname: '/products',
  keywords: [
    'ChatGPT product feed',
    'merchant product schema',
    'product feed required fields',
    'OpenAI product discovery',
    'is_eligible_search',
    'is_eligible_checkout',
  ],
});

export default function ProductsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-14 px-6 py-24 lg:py-32">
      <SectionHeader
        eyebrow="Products"
        title="Feed Reference"
        subtitle="Field-level schema for making products discoverable and optionally purchasable inside ChatGPT."
      />

      <div data-product-feed-version-container>
        <div
          data-product-feed-version-fragment
          className="space-y-4 border border-(--color-bg-secondary) bg-(--color-bg-light) p-6 md:p-8"
        >
          <h2 id="feed-reference" className="text-2xl font-bold text-(--color-text-dark)">
            Feed Reference
          </h2>
          <p className="text-(--color-soft-gray)">
            To make your products discoverable inside ChatGPT, merchants provide a structured product feed file
            that OpenAI ingests and indexes. This specification defines the product schema for file uploads:
            field names, data types, constraints, and example values needed for accurate discovery, pricing,
            availability, and seller context.
          </p>
          <p className="text-(--color-soft-gray)">
            Each table below groups fields by schema object and indicates whether a field is Required or Optional,
            along with validation rules to help engineering teams build and maintain a compliant upload file.
          </p>
          <p className="text-(--color-soft-gray)">
            Supplying all required fields ensures products can be displayed correctly, while optional fields enrich
            relevance and user trust.
          </p>
        </div>
      </div>

      {FEED_SECTIONS.map((section) => (
        <section key={section.title} className="space-y-5 border border-(--color-bg-secondary) bg-white p-6 md:p-8">
          <div>
            <h3 className="text-2xl font-bold text-(--color-text-dark)">{section.title}</h3>
            <p className="mt-2 max-w-4xl text-(--color-soft-gray)">{section.description}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-y border-(--color-bg-secondary) bg-(--color-bg-light) text-(--color-text-dark)">
                  <th className="px-3 py-3 font-semibold">Attribute</th>
                  <th className="px-3 py-3 font-semibold">Required</th>
                  <th className="px-3 py-3 font-semibold">Data Type</th>
                  <th className="px-3 py-3 font-semibold">Description</th>
                  <th className="px-3 py-3 font-semibold">Example</th>
                </tr>
              </thead>
              <tbody>
                {section.fields.map((field) => (
                  <tr key={`${section.title}-${field.attribute}`} className="border-b border-(--color-bg-secondary) align-top">
                    <td className="px-3 py-3 font-mono text-xs text-(--color-text-dark)">{field.attribute}</td>
                    <td className="px-3 py-3 text-(--color-soft-gray)">{field.requirement}</td>
                    <td className="px-3 py-3 text-(--color-soft-gray)">{field.dataType}</td>
                    <td className="px-3 py-3 text-(--color-soft-gray)">{field.description}</td>
                    <td className="px-3 py-3 text-(--color-soft-gray)">{field.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
