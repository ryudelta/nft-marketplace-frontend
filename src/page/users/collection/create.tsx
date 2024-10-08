import React, { useState } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { Collections, mintSettings } from '../../../hooks/collection/interface';
import { DateToIntTime, IntTimeToDate } from '../../../tools/date';

const CollectionCreatorPage: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null); 
  const [formData, setFormData] = useState<Collections>({
    ImageUrl: '',
    CollectionType: mintSettings.SelfMint,
    ContractName: '',
    ContractSymbol: '',
    EndDate: Date.now(),
    NftType: '',
    StartDate: Date.now()
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'startDate' || name === 'endDate') {
      const timestamp = value ? DateToIntTime(value) : null;
      setFormData({ ...formData, [name]: timestamp });
    } else if (name === 'image') {
      const input = e.target as HTMLInputElement;
      const file = input.files?.[0] || null;
      setFormData({ ...formData, ImageUrl: file });
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }else{
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleRemoveImage = () => {
    setFormData({ ...formData, ImageUrl: null });
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <h2>Collection Form</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xs={12} md={6}>
          <Form.Group controlId="image" className="mb-3">
              <Form.Label>Logo Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
              />
            </Form.Group>

            {imagePreview && (
              <div className="position-relative mb-3">
                <Image src={imagePreview} alt="Preview" fluid className="mb-2" />
                <Button variant="danger" onClick={handleRemoveImage} style={{ position: 'absolute', top: 0, right: 0 }}>
                  X
                </Button>
              </div>
            )}
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="CollectionType" className="mb-3">
            <Form.Label>Collection Type</Form.Label>
            <Form.Select
              name="CollectionType"
              value={formData.CollectionType}
              onChange={handleInputChange}
            >
              <option value="LaunchpadMinting">Launchpad Minting</option>
              <option value="SelfMinting">Self Minting</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="ContractName" className="mb-3">
            <Form.Label>Contract Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter contract name"
              name="ContractName"
              value={formData.ContractName}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="contractSymbol" className="mb-3">
            <Form.Label>Contract Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter contract symbol"
              name="ContractSymbol"
              value={formData.ContractSymbol}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="nftType" className="mb-3">
            <Form.Label>Collection Type</Form.Label>
            <Form.Select
              name="NftType"
              value={formData.NftType}
              onChange={handleInputChange}
            >
              <option value="">Select Type</option>
              <option value="dynamic">Dynamic</option>
              <option value="fixed">Fixed</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="startDate" className="mb-3">
            <Form.Label>Start Mint Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.StartDate !== null ? IntTimeToDate(formData.StartDate).toISOString().split('T')[0] : ''}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="endDate" className="mb-3">
            <Form.Label>End Mint Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={formData.EndDate !== null ? IntTimeToDate(formData.EndDate).toISOString().split('T')[0] : ''}
              onChange={handleInputChange}
            />
          </Form.Group></Col>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default CollectionCreatorPage;