/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ITagService } from '../../domain/interface/itag.service';
import { TagImplRepository } from '../../infrastructure/repository/tagImpl.repository';
import { TicketDetailResponseDto } from 'src/modules/ticket-detail/application/dto/ticketDetailRes.dto';
import { TicketResponseDto } from 'src/modules/ticket/application/dto/ticketRes.dto';
import { TagRequestDto } from '../dto/tagReq.dto';
import { TagResponseDto } from '../dto/tagRes.dto';
import { mapper } from 'src/utils/mapping/mapper';
import { TagEntity } from '../../domain/model/tag.entity';
import { ErrorManager } from 'src/utils/errors/error.manager';
import { TicketEntity } from 'src/modules/ticket/domain/model/ticket.entity';
import { TicketDetailEntity } from 'src/modules/ticket-detail/domain/model/ticketDetail.entity';
import { TicketDetailImplRepository } from 'src/modules/ticket-detail/infrastructure/ticketDetailImpl.repository';

@Injectable()
export class TagImplService implements ITagService {
    constructor(private readonly tagRepository: TagImplRepository,
        private readonly ticketDetailRepository: TicketDetailImplRepository){}

    
    async registerTag(tag: TagRequestDto): Promise<TagResponseDto> {
        try {
            const tagEntity = mapper.map(tag, TagRequestDto, TagEntity);

            const responseTag = await this.tagRepository.createTag(tagEntity);

            return mapper.map(responseTag, TagEntity, TagResponseDto);

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async updateTagById(id: number, tagUpdate: TagRequestDto): Promise<TagResponseDto> {
        try{
            const tagEntity = mapper.map(tagUpdate, TagRequestDto, TagEntity);
            const responseTag = await this.tagRepository.updateTagById(id, tagEntity);
            if (!responseTag) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Tag with Id ${id} not found`
                })
            }
            return mapper.map(responseTag, TagEntity, TagResponseDto );
        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async deleteTagById(id: number): Promise<TagResponseDto> {
        try {
            const responseTag = await this.tagRepository.deleteTagById(id);
            if (!responseTag) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Tag with Id ${id} not found`
                })
            }
            const tag = mapper.map(responseTag, TagEntity, TagResponseDto);
            return tag;

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async findTagById(id: number): Promise<TagResponseDto> {
        try {
            const responseTag = await this.tagRepository.findTagById(id);
            if (!responseTag) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Tag with Id ${id} not found`
                })
            }
            const tag = mapper.map(responseTag, TagEntity, TagResponseDto);
            return tag;

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async findTicketsByTagId(id: number): Promise<TicketResponseDto[]> {
        const responseTickets = await this.tagRepository.findTicketsByTagId(id);

        const tickets = responseTickets.map(responseTickete =>
            mapper.map(responseTickete, TicketEntity, TicketResponseDto)
        );

        const fullTickets = await Promise.all(
            tickets.map(async (rp) => {
              const td = await this.ticketDetailRepository.findTicketDetailByTicketId(rp.id);
              rp.ticketDetail = mapper.map(td, TicketDetailEntity, TicketDetailResponseDto);
              return rp;
            }),
          );

        return fullTickets;
    }
    
    async assignTagToTicketDetail(id: number, tdetailId: number): Promise<TicketDetailResponseDto> {
        try{
            const responseTicketDetail = await this.tagRepository.assignTagToTicketDetail(id,tdetailId);
            if(!responseTicketDetail) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `TicketDetail with Id ${tdetailId} not found`
                })
            }

            const ticketDetail = mapper.map(responseTicketDetail, TicketDetailEntity, TicketDetailResponseDto);
            return ticketDetail;
        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async listAllTags(): Promise<TagResponseDto[]> {
        const tags = await this.tagRepository.listAllTags();

        const tagsReponses = tags.map( tagRes => 
            mapper.map(tagRes, TagEntity, TagResponseDto)    
        );

        return tagsReponses;
    }
 }
