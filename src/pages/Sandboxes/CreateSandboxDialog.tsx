import { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalVariants } from "../../hooks/variants";
import { Variant } from "../../models/Variant";
import ModalDialog from "../../components/ModalDialog";
import RadioGroup from "../../components/RadioGroup";
import SelectBox from "../../components/SelectBox";
import TextButton from "../../components/TextButton";
import TextField from "../../components/TextField";
import VariantPreview from "../../components/VariantPreview";

const Rows = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  margin-bottom: 8px;

  &:last-child {
    margin: 0;
  }
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentSections = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: top;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Section = styled.div`
  margin: 12px 0 0 0;

  &:first-child {
    margin: 0;
  }

  @media (min-width: 768px) {
    margin: 0 0 0 16px;
  }
`;

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}
export default function CreateSandboxDialog(props: Props) {
  const [sandboxSource, setSandboxSource] = useState("new game");
  const [selectedVariant, setSelectedVariant] = useState<Variant>();
  const [variants, loadingVariants, variantsError] = useGlobalVariants();

  useEffect(() => {
    if (variants.length > 0) {
      setSelectedVariant(variants[0]);
    }
  }, [variants]);

  return (
    <ModalDialog
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      title="Create Sandbox"
    >
      <Rows>
        <Row>
          <ContentSections>
            <Section>
              <VariantPreview variant={selectedVariant} width="240px" />
            </Section>
            <Section>
              <TextField
                id="sandbox-name"
                name="Sandbox Name"
                label="Sandbox Name"
              />
              <RadioGroup
                label="Create Sandbox from:"
                onChange={(e) => setSandboxSource(e.target.value)}
                selected={sandboxSource}
                items={[
                  {
                    label: "New game",
                    value: "new game",
                  },
                  {
                    label: "Existing game",
                    value: "existing game",
                  },
                ]}
              />
              {sandboxSource === "new game" && (
                <SelectBox
                  id="sandbox-variant"
                  name="Sandbox Variant"
                  label="Game Variant:"
                  items={variants?.map((variant) => ({
                    label: variant.name,
                    value: variant.name,
                  }))}
                />
              )}
              {sandboxSource === "existing game" && (
                <SelectBox
                  id="sandbox-game"
                  name="Sandbox Game"
                  label="Choose a Game:"
                  items={[
                    {
                      label: "Diplomacy with the Boys",
                      value: "ancientmed",
                    },
                    {
                      label: "Classic - 7 players",
                      value: "classic",
                    },
                  ]}
                />
              )}
            </Section>
          </ContentSections>
        </Row>
        <Row>
          <Center>
            <TextButton width="240px">Create</TextButton>
          </Center>
        </Row>
      </Rows>
    </ModalDialog>
  );
}
