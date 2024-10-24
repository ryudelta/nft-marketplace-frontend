import React, { useEffect, useState } from "react"
import { Container, Spinner } from "react-bootstrap"

const NftItemCreate: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [collection, setCollectinon] = useState<string>("")

    const handleCollection = (): string => {
      return ""
    }

    useEffect(() => {
        setLoading(false)
    })

    if (loading) {
        return (
          <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Container>
        );
      }
    
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center"  style={{ minHeight: '100vh' }}>
            <h2>Form create nft</h2>
        </Container>
    )
}

export default NftItemCreate;