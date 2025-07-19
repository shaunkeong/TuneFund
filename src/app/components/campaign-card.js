import Image from "next/image"
import Link from "next/link"

export default function CampaignCard({ campaign }) {
  return (
    <div className="campaign-card">
      <Image
        src={campaign.image || "/placeholder.svg?height=200&width=300"}
        alt={campaign.title}
        width={300}
        height={200}
        className="campaign-card-image"
      />
      <div className="campaign-card-content">
        <h3 className="campaign-card-title">{campaign.title}</h3>
        <p className="campaign-card-description">{campaign.description}</p>
        <Link href={`/campaigns/${campaign.id}`} className="campaign-card-button">
          View Details
        </Link>
      </div>
    </div>
  )
}
