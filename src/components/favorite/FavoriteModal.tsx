import { Modal } from '@nextui-org/react'
import { useState } from 'react'
import type { Media } from '@/types/tmdb'
import { Loading } from '@nextui-org/react'
import type { FavoriteMetadata } from '@/types/tmdb'
import type { IPFSMetadataInput } from '@/types/nftport'
import { getMediaTitle, tmdbImagePrefixPoster, getMediaReleaseDate } from '@/common/tmdb'
import { HeartIcon } from '@heroicons/react/24/solid'
import nftport from '@/common/nftPort'
import { handleError, handleSuccess } from '@/common/notification'
import useAddress from '@/hooks/useAddress'
import { LOGO_IPFS_URL } from '@/common/constants'

interface FavoriteModalProps {
  open: boolean
  onClose: () => void
  media: Media
}

const FavoriteModal: React.FC<FavoriteModalProps> = ({ open, onClose, media }) => {
  const [isMinting, setIsMinting] = useState(false)
  const { address } = useAddress()

  const handleFavorite = async () => {
    try {
      if (isMinting) {
        return
      }
      if (!address) {
        return
      }

      // initate minting process
      setIsMinting(true)

      // create metadata
      const metadata: FavoriteMetadata = {
        name: getMediaTitle(media),
        overview: media.overview || '',
        poster: tmdbImagePrefixPoster + (media.poster_path || media.backdrop_path),
        mediaType: media.media_type,
        releaseDate: getMediaReleaseDate(media) || '',
        mediaId: media.id as number,
      }

      // upload metadata to IPFS
      const ipfsMetadata: IPFSMetadataInput = {
        name: metadata.name,
        description: 'Favorite',
        file_url: LOGO_IPFS_URL,
        attributes: [],
        custom_fields: {
          ...metadata,
        },
      }

      const ipfsMetadataOutput = await nftport.uploadMetadata(ipfsMetadata)
      if (!ipfsMetadataOutput) {
        return handleError(new Error('Failed to upload metadata'))
      }
      const metadataURL = ipfsMetadataOutput.metadata_uri
      console.log('metadataURL', metadataURL)

      // mint Favorite
      const txHash = await nftport.mintFavorite(address, metadataURL)
      txHash
        ? handleSuccess(`Favorite minted successfully, txHash: ${txHash}`)
        : handleError(new Error('Failed to mint Favorite'))
      onClose()
    } catch {}
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        closeButton
        blur
        width="500px"
        className="bg-bgBlue cursor-default"
        preventClose={isMinting}
      >
        <Modal.Body>
          <div className="flex flex-col w-full h-full gap-3">
            <div className="w-full flex justify-center text-[20px] font-bold">
              {`Collect ${getMediaTitle(media)} as Favorite`}
            </div>
            <img
              alt="poster"
              src={tmdbImagePrefixPoster + (media.poster_path || media.backdrop_path)}
              className="w-full rounded-[8px] primaryShadow"
            />
            <div className="w-full flex justify-center">
              <div
                onClick={handleFavorite}
                className={`gradientBG w-[50px] h-[50px] flex justify-center items-center rounded-full 
              primaryShadow ${isMinting ? 'opacity-50' : 'cursor-pointer'}`}
              >
                {isMinting ? (
                  <Loading size="md" color={'secondary'} />
                ) : (
                  <HeartIcon className={`w-[35px] h-[35px] hover:fill-titlePurple`} />
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default FavoriteModal
